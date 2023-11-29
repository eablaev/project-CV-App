    import { useState } from "react";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

    export default function EducationSection (
        {addEducationItem,
        deleteEducationItem, 
        educationItems,
        setEducationItems
        }) {

        const [editableItem, setEditableItem] = useState(null)
        const [showForm, setShowForm] = useState(false);
        const [selectedListItemId, setSelectedListItemId] = useState(null)


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
                setEducationItems(newList)
            
                return
            }
            e.preventDefault();
        
            console.log(data)
            addEducationItem(data);
        
        };
        
        function onEdit(id) {
            
            let newItem = educationItems.filter(item => item.id === id);
            console.log(newItem[0].school)

            //keeping track of item being edited
            setEditableItem(newItem[0]);

            //keeping track of selected item
            setSelectedListItemId(newItem[0].id);
            
            setShowForm(true) 
            
        }

        function onDel(e) {
            let school = e.currentTarget.previousElementSibling.textContent;
            let itemToDelete = educationItems.filter(item => item.school == school);
            deleteEducationItem(itemToDelete[0]);
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
                <h2>Education: </h2>
                
                <div className="educationEditListContainer">
                    <h2 className={`addNew ${selectedListItemId === 'addNew' ? "selected" : ""}`}  
                        id="addNew" 
                        onClick={onAdd}>+</h2>
                    {educationItems.map(item => {
                        return (    
                            <div className={`listItem ${selectedListItemId === item.id ? 'selected' : ""}`} key={item.id}>
                                <h2 onClick={()=>{onEdit(item.id)}}>{item.school}</h2>
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
                                <input type="date" name="startDate" defaultValue={editableItem !== null ? editableItem.startDate : ''} />
                            </label>
                            <label>
                                <h3>End Date</h3>
                                <input type="date" name="endDate" defaultValue={editableItem !== null ? editableItem.endDate : ''}/>
                            </label>
                            <label>
                                <h3>City</h3>
                                <input type="text" name="city" defaultValue={editableItem !== null ? editableItem.city : ''}/>
                            </label>
                            <label>
                                <h3>School</h3>
                                <input type="text" name="school" defaultValue={editableItem !== null ? editableItem.school : ''}/>
                            </label>
                            <label>
                                <h3>Degree</h3>
                                <input type="text" name="degree" defaultValue={editableItem !== null ? editableItem.degree : ''}/>
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