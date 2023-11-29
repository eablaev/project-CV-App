

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const formatDateToMonthYear = (date) => {
    const formattedDate = new Date(date);

    const month = formattedDate.getMonth();
    const year = formattedDate.getFullYear();

    const formattedMonth = month < 10 ? "0" + month : month; 
    const formattedYear = year.toString();


    return `${formattedMonth}/${formattedYear}`
};



function EducationItemsList({ itemsList }) {
    return (
      <div>
        {itemsList.map(item => (
            <EducationItem item={item} key={item.id} />
        ))}
      </div>
    );
}

function ExperienceItemsList({ itemsList }) {
    return (
      <div>
        {itemsList.map(item => (
            <ExperienceItem item={item} key={item.id} />
        ))}
      </div>
    );
}


function EducationItem({item}) {
    return (
        <div className="item">
            <div className="left">
                <h4>{formatDateToMonthYear(item.startDate)} - {formatDateToMonthYear(item.endDate)}</h4>
                <h4>{item.city}</h4>
            </div>
            <div className="right">
                <h4>{item.school}</h4>
                <h4>{item.degree}</h4>
            </div>
        </div>
    )
}
function ExperienceItem({item}) {
    return (
        <div className="item">
            <div className="left">
            <h4>{formatDateToMonthYear(item.startDate)} - {formatDateToMonthYear(item.endDate)}</h4>
                <h4>{item.city}</h4>
            </div>
            <div className="right">
                <h4>{item.company}</h4>
                <h4>{item.title}</h4>
                <h5>{item.responsibilities}</h5>
            </div>

        </div>
    )
}


export default function ResultCv({
    fullName, 
    email, 
    phone, 
    city, 
    educationItems,
    addEducationItem, 
    deleteEducationItem,
    experienceItems,
    }) {
    return (
      <div className="resultCV" id='resultCV'>
        <div className="cvHeader">
          <h2>{fullName}</h2>
          <div className="contacts">
            <div className="contactsItem">
                <FontAwesomeIcon icon="envelope" />
                <h4>{email}</h4>
            </div>
            <div className="contactsItem">
                <FontAwesomeIcon icon='phone' />
                <h4>{phone}</h4>
            </div>
            <div className="contactsItem">
                <FontAwesomeIcon icon="globe" />
                <h4>{city}</h4>
            </div>
          </div>
        </div>
        <div className="cvBody">
          <div className="cvSection">
            <h3>Education</h3>
            <div className="educationItemsContainer">
             <EducationItemsList itemsList={educationItems} />
            </div>  
          </div>
          <div className="cvSection">
            <h3>Professional Experience</h3>
            <div className="experienceItemsContainer">
                <ExperienceItemsList itemsList={experienceItems} />
            </div>
  
          </div>
        </div>
      </div>
    )
    
  }