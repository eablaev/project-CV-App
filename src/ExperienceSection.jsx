import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ExperienceSection (
    {addExperienceItem,
    deleteExperienceItem,
    experienceItems,
    setExperienceItems,
    }) {

    const [editableItem, setEditableItem] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedListItemId, setSelectedListItemId] = useState(null);

    const handleSubmit = (e) => {
        // Access the form data here
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
    
        if(editableItem !==null) {
            e.preventDefault();
            console.log('edit');
            data.id = editableItem.id
            const newList = educationItems.map((item) =>
            item.id === editableItem.id ? data: item );

            console.log(newList)
            setExperienceItems(newList)
        
            return
        }
        e.preventDefault();
    
        console.log(data)
        addExperienceItem(data);
    
    };

    function onEdit(id) {
            
        let newItem = experienceItemsItems.filter(item => item.id === id);
        console.log(newItem[0].school)

        //keeping track of item being edited
        setEditableItem(newItem[0]);

        //keeping track of selected item
        setSelectedListItemId(newItem[0].id);
        
        setShowForm(true) 
        
    }

    function onDel(e) {
        let company = e.currentTarget.previousElementSibling.textContent;
        let itemToDelete = experienceItems.filter(item => item.company == company);
        deleteExperienceItem(itemToDelete[0]);
    }

    function onAdd() {
        
        setEditableItem(null)
        setSelectedListItemId("addNew");
        setShowForm(true)
    }

    function onCancel() {
        setEditableItem(null)
        setSelectedListItemId(null);
        setShowForm(false)
    }




    return (
        <>
            <h2>Experience: </h2>
            <div className="experienceEditListContainer">
                    <h2 className={`addNew ${selectedListItemId === 'addNew' ? "selected" : ""}`}  
                        id="addNew" 
                        onClick={onAdd}>+</h2>
                    {experienceItems.map(item => {
                        return (    
                            <div className={`listItem ${selectedListItemId === item.id ? 'selected' : ""}`} key={item.id}>
                                <h2 onClick={()=>{onEdit(item.id)}}>{item.company}</h2>
                                <div className="del" onClick={(e)=> onDel(e)}>
                                    <FontAwesomeIcon icon="trash-can" />
                                </div>
                                
                            </div>
                        )
                    })}
            </div>
            <div className={`formContainer ${showForm ? 'open' : ''}`}>
                <form onSubmit={handleSubmit}>

                    <div className='section'>

                        <label>
                            <h3>Start Date</h3>
                            <input type="date" name="startDate"/>
                        </label>
                        <label>
                            <h3>End Date</h3>
                            <input type="date" name="endDate"/>
                        </label>
                        <label>
                            <h3>City</h3>
                            <input type="text" name="city"/>
                        </label>
                        <label>
                            <h3>Company</h3>
                            <input type="text" name="company"/>
                        </label>
                        <label>
                            <h3>Title</h3>
                            <input type="text" name="title"/>
                        </label>
                        <label>
                            <h3>Responsibilities</h3>
                            <textarea name="responsibilities" cols="30" rows="5"></textarea>
                        </label>
                        <div className="buttonsContainer">
                                <button type="submit">Add</button>
                                <button type="button" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>




       
            
        </>
    )
}