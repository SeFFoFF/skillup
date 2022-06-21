import React from "react"
import "../../../assets/css/messenger/tab.css"

export const Tab = ({ activeTab, isFriendsTab, setIsFriendsTab, icon }) => {
    return activeTab ?
        <div className={isFriendsTab ? "tab tab--active" : "tab "} onClick={() => setIsFriendsTab(true)}>
            { icon }
        </div>
        :
        <div className={!isFriendsTab ? "tab tab--active" : "tab "} onClick={() => setIsFriendsTab(false)}>
            { icon }
        </div>
}