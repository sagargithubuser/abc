import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/users";

function App() {

const [users, setUsers] = useState([]);

const [form, setForm] = useState({
name: "",
email: ""
});

const [editId, setEditId] = useState(null);

useEffect(() => {
getUsers();
}, []);

const getUsers = async () => {
const res = await axios.get(API);
setUsers(res.data);
};

const saveUser = async (e) => {

e.preventDefault();

if(editId){

await axios.put(
`${API}/${editId}`,
form
);

setEditId(null);

}else{

await axios.post(
API,
form
);

}

setForm({
name:"",
email:""
});

getUsers();

};

const editUser=(u)=>{

setEditId(
u.id
);

setForm({

name:u.name,
email:u.email

});

};

const deleteUser=async(id)=>{

await axios.delete(
`${API}/${id}`
);

getUsers();

};

return (

<div className="container">

<h1>React CRUD</h1>

<form onSubmit={saveUser}>

<input
value={form.name}
placeholder="Name"
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
/>

<input
value={form.email}
placeholder="Email"
onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}
/>

<button>

{editId
?
"Update"
:
"Add"}

</button>

</form>

<hr/>

{
users.map((u)=>(

<div key={u.id}>

{u.name}

|

{u.email}

<button
onClick={()=>
editUser(u)
}
>

Edit

</button>

<button
onClick={()=>
deleteUser(u.id)
}
>

Delete

</button>

</div>

))
}

</div>

);

}

export default App;