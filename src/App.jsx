import { FaLink } from "react-icons/fa";
import './App.css';
import { GoMoveToEnd } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function App() {
  const [keyword, setKeyword] = useState('');
  const [link, setLink] = useState('');
  const [keywords, setKeywords] = useState([]);

  // Load keywords from local storage when the component mounts
  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem('keywords'));
    if (storedKeywords && storedKeywords.length > 0) {
      setKeywords(storedKeywords);
    }
  }, []);

  // Update local storage whenever keywords state changes
  useEffect(() => {
    if (keywords.length > 0) {
      localStorage.setItem('keywords', JSON.stringify(keywords));
    }
  }, [keywords]);

  const addLink = (e) => {
    e.preventDefault();
    if (link && keyword) {
      setKeywords([...keywords, { keyword, link }]);
      setKeyword('');
      setLink('');
    }
  };

  const deleteLink = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00f38d", // Updated to match your primary button color
      cancelButtonColor: "#d33", // Red is already used for delete actions, keeping it consistent
      confirmButtonText: "Yes, delete it!",
      background: "#e3eeef", // Matches your overall background color
      customClass: {
        title: 'custom-title',
        text: 'custom-text',
        icon: 'custom-icon',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        Swal.fire({
          title: "Deleted!",
          text: "Your link has been deleted.",
          icon: "success",
          confirmButtonColor: "#00f38d", // Matching the confirmation color
          background: "#e3eeef", // Matches your overall background color
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <FaLink className="logo-icon" /><span>link.store</span>
        </div>
        <div className="content">
          <h4 className="add-link">Add your link here</h4>
          <form onSubmit={addLink}>
            <div className="inut-links">
              <div className="input-feild">
                <label htmlFor="keyword">Add your Keyword Here</label>
                <input
                  required
                  type="text"
                  id="keyword"
                  placeholder="Start typing your keyword..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <span>Examples: Amazon, Etsy, Teespring, etc.</span>
              </div>
              <div className="input-feild">
                <label htmlFor="link">Add your Link Here</label>
                <input
                  required
                  type="url"
                  id="link"
                  placeholder="Copy+paste your link here"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <span>Your store link will be something like https://www.etsy.com/shop/NovaMarket, etc.</span>
                <div className="button">
                  <button type="submit">Add</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="links">
          {keywords.map((ele, index) => (
            <div className="link" key={index}>
              <span onClick={() => window.open(ele.link)}>{ele.keyword}</span>
              <div className="actions">
                <GoMoveToEnd className="icon" onClick={() => window.open(ele.link, '_blank')} />
                <MdDeleteForever className="icon" onClick={() => deleteLink(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
