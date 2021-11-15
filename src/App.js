import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About'

import ContactList from "./components/ContactList";
import ContactInput from "./components/ContactInput";

function App() {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchContacts(), []);

  return (
    <div className="container mx-auto">
      <div>
        <Router>
          <Navbar />
          <Route path="/add" render={() => <ContactInput contacts={contacts} setContacts={setContacts} />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/contacts" render={() => <ContactList contacts={contacts} setContacts={setContacts} loading={loading} />} />
        </Router>
      </div>
    </div>
  );
}

export default App;
