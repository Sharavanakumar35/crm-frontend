import React, { useState } from 'react';
import '../components/DropdownSearch.css'; // Import CSS file

function DropdownSearchBox({handleSearchChange}) {
  const [selectedItem, setSelectedItem] = useState('Name');
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleItemClick = (value) => {
    setSelectedItem(value);
    setIsOpen(false);
  };

  const searchChange = (event) => {
    const val = event.target.value;
    setSearchTerm(val);
    handleSearchChange(val, selectedItem)
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="search-box">
        <input value={searchTerm} className="search-form-input" type="search" name="search" placeholder="Search..." onChange={(event) => {searchChange(event)}} />
        <details className="dropdown" open={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <summary className="dropdown-button">
            <span className="selected-item">{selectedItem}</span>
          </summary>
          <details-menu className="dropdown-menu">
            <div className="dropdown-menu-header">Search By</div>
            <div className="dropdown-menu-list">
                {['Name', 'Email', 'Company', 'Status', 'Years Experience', 'Position', 'Job Type', 'Location', 'Current Company'].map((menu, index) => {
                    return (
                        <label key={index} className="dropdown-menu-item">
                          <input
                            type="radio"
                            name="item"
                            value={menu}
                            checked={selectedItem === menu}
                            onChange={() => handleItemClick(menu)}
                          />
                          <span className='ms-2'>{menu}</span>
                        </label>  
                    );
                })}
            </div>
          </details-menu>
        </details>
      </div>
    </div>
  );
}

export default DropdownSearchBox;
