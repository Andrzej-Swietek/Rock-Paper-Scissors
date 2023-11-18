import * as Notification from "expo-notifications";
import * as Permission from "expo-permissions";
import {PermissionResponse} from "expo-permissions";

export interface NotificationPayload {
    title: string,
    body: string
}

type NotificationPermission = 'granted' | 'denied' | 'undetermined'

export class NotificationManager {
    static instance: NotificationManager;
    private permission: NotificationPermission;

    private constructor() {
        Notification.requestPermissionsAsync()
            .then( (response)=> {
                this.permission = response.status;

                if ( this.permission == "granted" ) {
                    Notification.setNotificationHandler({
                        handleNotification: async ()=> ({
                            shouldPlaySound: true,
                            shouldShowAlert: true ,
                            shouldSetBadge: true,
                        })
                    });
                }
            })

    }

    public static getInstance(): NotificationManager {
        if ( !NotificationManager.instance ){
            NotificationManager.instance = new NotificationManager()
        }
        return NotificationManager.instance
    }

    public sendInstantNotification(payload: NotificationPayload){
        console.log("SEND")
        Notification.scheduleNotificationAsync({
            content: payload,
            trigger: {
                seconds: 1
            }
        })
    }
}