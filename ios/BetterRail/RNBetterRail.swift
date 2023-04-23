import Foundation
import Intents
import WidgetKit
import FirebaseCrashlytics

/// A set of common functions to be called from the RN app
@objc(RNBetterRail)
class RNBetterRail: NSObject {
  
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  // MARK - Widget methods
  /// This saves the current origin & destination station IDs for use as StationIntent initial values.
  @objc func saveCurrentRoute(_ originId: String, destinationId: String) {
    let currentRoute = [originId, destinationId]
    
    UserDefaults(suiteName: "group.il.co.better-rail")!.set(currentRoute, forKey: "defaultRoute")
  }
  
  @objc func donateRouteIntent(_ originId: String, destinationId: String) {
    let intent = RouteIntent()
    
    let originStation = getStationById(Int(originId)!)!
    let destinationStation = getStationById(Int(destinationId)!)!
    
    intent.origin = INStation(identifier: originId, display: originStation.name)
    intent.destination = INStation(identifier: destinationId, display: destinationStation.name)
    
    let interaction = INInteraction(intent: intent, response: nil)
    interaction.donate { error in
      if let error = error {
        print("Unable to donate INInteraction: \(error)")
      }
    }
  }
  
  @objc func reloadAllTimelines() -> Void {
    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadAllTimelines()
    }
  }
  
  // MARK - Live Activities methods
  
  @available(iOS 16.2, *)
  @objc func monitorActivities() {
    LiveActivitiesController.shared.monitorLiveActivities()
  }
  
  /// data - A JSON representation of a Route
  @available(iOS 16.2, *)
  @objc func startActivity(_ routeJSON: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    let decoder = JSONDecoder()
    

    do {
      Crashlytics.crashlytics().log("NATIVE: DECODING \(routeJSON) . .")
      let route = try decoder.decode(Route.self, from: routeJSON.data(using: .utf8)!)
      Crashlytics.crashlytics().log("NATIVE: DECODED \(route)")
      Task {
        Crashlytics.crashlytics().log("NATIVE: STARTING ACTIVITY . . .")
        await LiveActivitiesController.shared.startLiveActivity(route: route)
        Crashlytics.crashlytics().log("NATIVE: ACTIVITY STARTED !")
        
        // wait for the token to have it's ride Id assigned
        Crashlytics.crashlytics().log("NATIVE: WAITING FOR TOKEN . . ")

        let newToken = await LiveActivitiesController.tokenRegistry.awaitNewTokenRegistration()
        Crashlytics.crashlytics().log("NATIVE: TOKEN RECIEVED! token - \(newToken.token) rideId - \(newToken.rideId) ")

        Crashlytics.crashlytics().log("NATIVE: BACK TO RN ! BYE BYE ! ")

        // report to React Native
        resolve(newToken.rideId)
      }
    } catch {
      print("Error decoding JSON: \(String(describing: error))")
      reject("error", "An error occured while starting activity from RN", error)
    }
  }
  
  
  @available(iOS 16.2, *)
  @objc func endActivity(_ rideId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      await LiveActivitiesController.shared.endLiveActivity(rideId: rideId)
      resolve(true)
    }
  }
  
  @available(iOS 16.2, *)
  @objc func isRideActive(_ rideId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      let tokens = await LiveActivitiesController.tokenRegistry.getTokens()
      let jsonArray = tokens.map { (rideToken) -> [String: String] in
        return ["rideId": rideToken.rideId, "token": rideToken.token]
      }
      
      do {
          let jsonData = try JSONSerialization.data(withJSONObject: jsonArray, options: .prettyPrinted)
          if let jsonString = String(data: jsonData, encoding: .utf8) {
              resolve(jsonString)
          }
      } catch {
        print(error.localizedDescription)
          reject("error", "error", error)
      }
    }
  }
}
