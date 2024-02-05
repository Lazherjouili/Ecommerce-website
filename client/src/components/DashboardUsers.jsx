import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((allUsers) => setUsers(allUsers.data))
      .catch((err) => console.log(err));
  }, []);
  const DeleteUser= (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        console.log(res);
        const filteredUsers = users.filter((user) => {
          return user._id !== id;
        });
        setUsers(filteredUsers);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-10">
      
      
      
      <table className=" border-collapse  md:table  mt-5 w-full ">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative w-full">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Username
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Email
            </th>

            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Role
            </th>
            
          
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group ">
          {users.map((oneUser) => {
            return (
              <tr
                key={oneUser._id}
                className=" border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {oneUser.username}
                </td>

                
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneUser.email}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneUser.role}
                </td>
               

                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell  ">
                  <div className="flex gap-2 justify-center">
                 
                  <button
                    onClick={()=>DeleteUser(oneUser._id)}
                    className="bg-purple-700 text-white font-bold py-1 px-4 border rounded "
                  >
                    Delete
                  </button>
                
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        
      </table>
      
    </div>
  );
};

export default DashboardUsers;
