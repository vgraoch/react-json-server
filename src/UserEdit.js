import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
    const { userid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/users/" + userid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            userchange(resp.user);
            emailchange(resp.email);
            pwdchange(resp.pwd);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[user,userchange]=useState("");
    const[email,emailchange]=useState("");
    const[pwd,pwdchange]=useState("");
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const userdata={id,user,email,pwd};
      

      fetch("http://localhost:8000/users/"+userid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(userdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>User Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>User</label>
                                        <input required value={user} onMouseDown={e=>valchange(true)} onChange={e=>userchange(e.target.value)} className="form-control"></input>
                                    {user.length==0 && validation && <span className="text-danger">Enter the user name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input value={pwd} onChange={e=>pwdchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default UserEdit;