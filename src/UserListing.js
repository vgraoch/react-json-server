import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserListing = () => {
    const [userdata, userdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/users/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/users/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/users/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/users").then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Users Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="users/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>User</td>
                                <td>Email</td>
                                <td>Password</td>
                            </tr>
                        </thead>
                        <tbody>

                            {userdata &&
                                userdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.user}</td>
                                        <td>{item.email}</td>
                                        <td>***</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserListing;