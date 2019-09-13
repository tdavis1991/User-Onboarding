import React from 'react';

const UserCard = (props) => {
    return (
        <div className="user-info" key= {props.key}>
            Username: {props.name} <br />
            Email: {props.email} <br />
            Role: {props.role}
        </div>
    )
}

export default UserCard;