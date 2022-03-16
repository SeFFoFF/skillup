import React from "react"
import dayjs from "dayjs"
import "../../../assets/css/messenger/userInfoModal.css"

export const UserInfoModal = ({ user, setActive }) => {

    return (
        <div className="user-modal-info" onClick={() => setActive(false)}>
            <div className="user-modal-info__content" onClick={e => e.stopPropagation()}>
                <img className="user-modal-info__image" src={user?.photoURL} alt=""/>
                <p className="user-modal-info__name">{ user?.displayName }</p>
                <p className="user-modal-info__email">{ user?.email }</p>
                <p className="user-modal-info__createdAt">Created at: { dayjs(user?.metadata.creationTime).format("DD MMMM YYYY") }</p>
            </div>
        </div>
    )
}