import { useState } from "react";

function DepositForm() {
    // Separate states for each field
    const [formData, setFormData] = useState({
        name: "",
        targetAmount: "",
        category: "",
        deadline: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        targetAmount: +formData.targetAmount, // number conversion happens here 
        savedAmount: 0,
        createdAt: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error();
    setFormData({ name: '', targetAmount: '', category: '', deadline: '' }); // Reset form
  } catch {
    alert('Failed to save goal');
  }
};
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Goal name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    name="targetAmount"
                    type="number"
                    placeholder="Target Amount"
                    value={formData.targetAmount}
                    onChange={handleChange}
                />
                {/* here one can sellect the categories */}
                <select
                   name="category"
                    value={formData.category}
                  onChange={handleChange}
                     required
                >
               <option value="">Select category</option>
               <option value="Travel">Travel</option>
               <option value="Emergency">Emergency</option>
               <option value="Education">Education</option>
               </select>
                <input
                    name="deadline"
                    type="date"
                    placeholder="Deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />
                <button type="submit">Create Goal</button>
            </form>
        </div>
    );
}

export default DepositForm;