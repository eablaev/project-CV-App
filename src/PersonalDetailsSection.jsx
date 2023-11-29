

export default function PersonalDetailsSection ({fullName,fullNameOnChange, 
    email, emailOnChange,
    phone, phoneOnChange,
    city, cityOnChange 
    }) {
   return (
    <>
        <div className='section'>
          <h2>Personal details: </h2>
            <label>
            <h3>Full Name: </h3>
            <input type="text" 
            value={fullName}
            onChange={fullNameOnChange}
          />
          </label>
          <label>
            <h3>Email: </h3>
            <input type="email" 
            value={email}
            onChange={emailOnChange}
          />
        </label>
        <label>
          <h3>Phone: </h3>
          <input type="tel"
          value={phone} 
          onChange={phoneOnChange}
          />
        </label>
        <label>
          <h3>City: </h3>
          <input type="text" 
          value={city}
          onChange={cityOnChange}
          />
        </label>
      </div>
    </>
   )
  }