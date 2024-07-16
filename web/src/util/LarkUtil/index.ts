import axios from 'axios'
import type { LarkUtilType } from './type'
import { ENV } from '@/Env'

class LarkClass {
  protected params: {
    APP_ID: string
    APP_SECRET: string
    LARK_TOKEN?: string
  }

  constructor(p: { APP_ID: string; APP_SECRET: string }) {
    this.params = p
    this.params.LARK_TOKEN = 't-g2067giIAS3UON6SGOBKVFUZES6VHS3PC5DUF54I'
    // this.getAccessToken().then((token: string) => {
    //   this.params.LARK_TOKEN = token
    // })
  }

  protected async getAccessToken(): Promise<string> {
    try {
      const response = await axios.post(
        'https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal/',
        {
          app_id: this.params.APP_ID,
          app_secret: this.params.APP_SECRET
        }
      )
      return response.data.app_access_token
    } catch (error) {
      console.error('Error getting access token:', error)
      throw error
    }
  }

  async createMeeting(p: {
    summary: string
    description: string
    startDate: Date
    duration: number // unit: mins
  }): Promise<any> {
    const start_time = Math.floor(p.startDate.getTime() / 1000)
    const end_time = start_time + p.duration * 60
    const meetingDetails: LarkUtilType['MeetingDetails'] = {
      summary: 'Your Meeting Title',
      description: 'Meeting Description',
      start_time: start_time,
      end_time: end_time,
      attendees: []
    }

    try {
      // https://open.larksuite.com/open-apis/vc/v1/reserves/apply
      const response = await axios.post(
        'https://open.larksuite.com/open-apis/meeting/v1/meetings',
        meetingDetails,
        {
          headers: {
            Authorization: `Bearer ${this.params.LARK_TOKEN}`
          }
        }
      )
      return response.data.data
    } catch (error) {
      console.error('Error creating meeting:', error)
      throw error
    }
  }
}

const LarkInstance = new LarkClass({
  APP_ID: ENV.appId,
  APP_SECRET: ENV.appSecret
})

export { LarkInstance, LarkClass }
