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
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')

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
        { startDate:'2012-07-23', 
        endDate:'2012-11-25',
        school: 'UCLA',
        degree:'Computer Science',
        city:'Los Angeles',
        id:1,
        editable: false
        },
        { startDate:'2023-02-23', 
        endDate:'2020-04-24',
        school: 'LACMA',
        degree:'Creative Writing',
        city:'Los Angeles',
        id:3,
        editable: true
        }
    ]);
    const [experienceItems, setExperienceItems] = useState([
        { startDate:'2011-04-23', 
        endDate:'2019-07-23',
        company: 'TEX Drive',
        title:'Junior Full Stack Engineer',
        city:'Los Angeles',
        responsibilities: "Actively participate in coding tasks, including developing software, applications, or web pages using various programming languages and tools.",
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
