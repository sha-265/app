import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { RailApiGetRoutesResult } from "./api.types"
import { parseApiDate } from "../../utils/helpers/date-helpers"

export class AnnouncementsApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getAnnouncements() {
    try {
      const response: ApiResponse<RailApiGetRoutesResult> = await this.api.apisauce.get(`apiinfo/api/Info/GeneralUpdates?id=-1`)
      console.log(response)
      return response
    } catch (err) {
      console.error(err)
    }
  }
}
