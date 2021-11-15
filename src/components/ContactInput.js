import { useRef, useState } from "react";
import { LoadingSpinner } from "../assets/icons";

export default function ContactInput({ setContacts, contacts }) {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  const [loading, setLoading] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    const email = emailInputRef.current.value;

    if (name === "" || phone === "" || email === "")  return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/contacts", {
        method: "POST",
        body: JSON.stringify({ name, phone, email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      nameInputRef.current.value = "";
      phoneInputRef.current.value = "";
      emailInputRef.current.value = "";

      setContacts([...contacts, data]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="page-title">Add Contacts</h1>
      <form onSubmit={submitForm}>
        <div className="contact-form">
          <div className="input-group">
            <input
              type="text"
              className="rounded-l-lg contact-input"
              placeholder="name"
              ref={nameInputRef}
              disabled={loading}
            />
            <input
              type="text"
              className="rounded-r-lg contact-input"
              placeholder="phone"
              ref={phoneInputRef}
              disabled={loading}
            />
            <input
              type="text"
              className="rounded-r-lg contact-input"
              placeholder="email"
              ref={emailInputRef}
              disabled={loading}
            />
          </div>
          <button type="submit" className="add-button" disabled={loading}>
            {loading && <LoadingSpinner className="spinner" />}
            {loading ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
