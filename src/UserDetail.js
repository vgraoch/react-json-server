import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const UserDetail = () => {
    const { userid } = useParams();

    const [userdata, userdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/users/" + userid).then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>

                {userdata &&
                    <div>
                        <h2>The user name is : <b>{userdata.name}</b>  ({userdata.id})</h2>
                        <h3>User Details</h3>
                        <h5>Email is : {userdata.email}</h5>
                        <h5>Password is : {userdata.pwd}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default UserDetail;