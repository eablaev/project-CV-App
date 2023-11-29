import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

import PersonalDetailsSection from './PersonalDetailsSection'
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'
import ResultCv from './ResultCv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faEnvelope, faGlobe, faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons';

library.add(faPhone, faEnvelope, faGlobe, faTrashCan, faDownload);

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function onDownloadPDF() {
    
  const resultCv = document.getElementById('resultCV'); // Assuming you have an element with id 'result-cv'
  html2canvas(resultCv, {scale: 4})
    .then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save('my-cv.pdf');
  });

}

function App() {
    const [fullName, setFullName] = useState('Napoleon Bonaparte')
    const [email, setEmail] = useState('napoleon@france.fr')
    const [phone, setPhone] = useState('+33 1 23 45 67 89')
    const [city, setCity] = useState('Paris, France')

    function fullNameOnChange(e) {
        setFullName(e.target.value)
    }
    function emailOnChange(e) {
        setEmail(e.target.value)
    }
    function phoneOnChange(e) {
        setPhone(e.target.value)
    }
    function cityOnChange(e) {
        setCity(e.target.value)
    }

    const [educationItems, setEducationItems] = useState([
        { startDate:'1779-01-01', 
        endDate:'1784-01-01',
        school: 'College of Autun',
        degree:'French Language',
        city:'Burgundy',
        id:1,
        editable: false
        },
        { startDate:'1784-01-01', 
        endDate:'1785-01-01',
        school: 'École Militaire',
        degree:'Military Tactics',
        city:'Paris',
        id:3,
        editable: true
        }
    ]);
    const [experienceItems, setExperienceItems] = useState([
        { startDate:'1904-01-01', 
        endDate:'1815-07-22',
        company: 'First French Empire',
        title:'Emperor of the French',
        city:'Paris',
        responsibilities: "Ruled as the Emperor of the French and lead the French army in wars against various European coalitions.",
        id:1
        }
    ]);

    function addEducationItem (newItem) {
        const id = uuidv4(); // Generate a unique ID
        setEducationItems([...educationItems, { ...newItem, id }]);
    };
    function deleteEducationItem (delItem) {
        const newList = educationItems.filter(item => delItem.id !==item.id);
        setEducationItems(newList);
    };

    function addExperienceItem (newItem) {
        const id = uuidv4(); // Generate a unique ID
        setExperienceItems([...experienceItems, { ...newItem, id }]);
    };
    function deleteExperienceItem (delItem) {
        const newList = experienceItems.filter(item => delItem.id !==item.id)
        setExperienceItems(newList);
    };

  return (

    <>
    <div className="inputSectionsContainer">
        <PersonalDetailsSection 
            fullName={fullName} fullNameOnChange={fullNameOnChange}
            email={email} emailOnChange={emailOnChange}
            phone={phone} phoneOnChange={phoneOnChange}
            city={city} cityOnChange={cityOnChange}/>

        <EducationSection 
            addEducationItem={addEducationItem} 
            setEducationItems={setEducationItems}
            deleteEducationItem={deleteEducationItem}
            educationItems={educationItems}
      
        />
        <ExperienceSection 
            addExperienceItem={addExperienceItem} 
            setExperienceItems={setExperienceItems}
            deleteExperienceItem={deleteExperienceItem}
            experienceItems={experienceItems}
           
        />
        <div className="downloadPDF" onClick={onDownloadPDF}>
            
           <FontAwesomeIcon icon="download" />
               
        </div>

    </div>
    
    <ResultCv 
        fullName={fullName}
        email={email} 
        phone={phone} 
        city={city}

        educationItems={educationItems}
        experienceItems={experienceItems}
        addEducationItem={addEducationItem}
        addExperienceItem={addExperienceItem}
        deleteEducationItem={deleteEducationItem}
        deleteExperienceItem={deleteExperienceItem}
    />
  
     
    </>
  )
}

export default App
