"use-client";

import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import Swal from "sweetalert2";

const { getAllMessages, deleteMessage } = require("@/pages/api/normalUserAPI");
const { useRouter } = require("next/navigation");
const { useState, useEffect } = require("react");

const Message = () => {
  let [messages, setMessages] = useState([]);
  let [token, setToken] = useState("");
  let router = useRouter();
  let [success, setSuccess] = useState(false);
  let [filteredResult, setFilteredResult] = useState(messages);

  useEffect(() => {
    getToken().then((data) => setToken(data));

    async function getToken() {
      // token = await localStorage.getItem("token")
      token = (await localStorage.getItem("token"))
        ? localStorage.getItem("token")
        : router.push("/login");

      return token;
    }
    getAllMessages().then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        // console.log(data);
        setMessages(data);
        setFilteredResult(data.reverse());
      }
    });
  }, [success]);

  const handleDelete = (id) => (event) => {
    event.preventDefault();
    setSuccess(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3138D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      width: "35%",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessage(id, token)
          .then((data) => {
            if (data.error) {
              Swal.fire({
                title: "Error!",
                text: data.error,
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal.fire({
                title: "Success!",
                text: data.msg,
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
              });
            }
          })
          .catch(Swal.fire("something went wrong!"));
        setSuccess(true);
      }
    });
  };
  const handleFilter = (id) => {
    if (id === "all") {
      setFilteredResult(messages.reverse());
      // setBgColor("all");
    } else if (id === "sub") {
      setFilteredResult(
        messages.filter((msg) => !msg.name || !msg.message).reverse()
      );
      // setBgColor(id);
    } else {
      setFilteredResult(
        messages.filter((msg) => msg.name || msg.message).reverse()
      );
      // setBgColor(id);
    }
    // console.log(id, filteredResult);

  };
  return (
    <>
      {token ? (
        <>
          <div className="xl:w-11/12 lg:w-10/12 md:w-9/12 w-full mx-auto ">
            <h1 className="text-3xl font-bold py-2">Messages</h1>
            <div className="pb-6 pt-2">
              <div class="relative overflow-x-auto shadow-md rounded-lg overflow-hidden ">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed ">
                  <thead class="text-xs md:text-sm text-white uppercase bg-blue-500">
                    <tr className="">
                      <th scope="col" class="px-3 md:px-2 py-3 w-1/6">
                        Date
                      </th>
                      <th scope="col" class="px-3 md:px-2 py-3 w-1/5">
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-3 md:px-2 py-3 w-1/5 flex items-center relative subject"
                      >
                        Subject
                        <span className="">
                          {/* <div className="dropdownicon"> */}
                            <MdMoreVert className="text-lg cursor-pointer" />
                          {/* </div> */}
                          <div className="dropdown normal-case bg-white text-gray-900  rounded-md absolute border">
                            <li
                              className="list-none border-b border-gray-400 px-2 py-2   hover:bg-gray-200 cursor-pointer rounded-t-md"
                              onClick={() => handleFilter("all")}
                            >
                              All
                            </li>
                            <li
                              className="list-none border-b border-gray-400 px-2 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleFilter("sub")}
                            >
                              Subscription
                            </li>
                            <li
                              className="list-none px-2 py-2 hover:bg-gray-200 cursor-pointer rounded-b-md"
                              onClick={() => handleFilter("contact")}
                            >
                              Contact Form
                            </li>
                          </div>
                        </span>
                      </th>
                      <th scope="col" class="px-3 md:px-2 py-3 w-5/12">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm overflow-y-auto max-h-[400px]">
                    {filteredResult?.length > 0 &&
                      filteredResult.map((message) => {
                        return (
                          <tr
                            key={message._id}
                            class="bg-white border-b hover:bg-gray-100 cursor-pointer msg-row"
                          >
                            <td class="px-3 md:px-2 py-3  font-medium text-gray-900 capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                              <Link href={`/admin/message/${message._id}`}>
                                {new Date(
                                  message.createdAt
                                ).toLocaleDateString()}
                              </Link>
                            </td>
                            <td class="px-3 md:px-2 py-3  font-medium text-gray-900 capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                              <Link href={`/admin/message/${message._id}`}>
                                {!message.name ? (
                                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {message.email &&
                                      message.email.split("@")[0]}
                                  </div>
                                ) : (
                                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {message.name}
                                  </div>
                                )}
                              </Link>
                            </td>
                            <td class="px-3 md:px-2 py-3 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis capitalize ">
                              <Link href={`/admin/message/${message._id}`}>
                                {message.message == null &&
                                message.name == null ? (
                                  <p>Subscription</p>
                                ) : (
                                  <p>Contact Form</p>
                                )}
                              </Link>
                            </td>
                            <td
                              scope="row"
                              class="px-3 md:px-2 py-3 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis "
                            >
                              <Link
                                href={`/admin/message/${message._id}`}
                                className="flex justify-between"
                              >
                                {!message.name && !message.message ? (
                                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    I want to subscribe to your newsletter
                                  </div>
                                ) : (
                                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {message.message}
                                  </div>
                                )}
                                <button
                                  className="mdelbtn text-red-500 px-4 self-center text-base hover:text-red-600 "
                                  onClick={handleDelete(message._id)}
                                >
                                  <FaTrash />
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>LOADING...</>
      )}
    </>
  );
};

export default Message;
