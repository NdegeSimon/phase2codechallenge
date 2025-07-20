import { useState, useEffect } from 'react';

function GoalList() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:3000/goals');
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  if (loading) return <div>Loading goals...</div>;

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <div key={goal.id} className="goal-card">
          <h3>{goal.name}</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}
            />
          </div>
          <p>${goal.savedAmount} of ${goal.targetAmount} saved</p>
          {/*supposed to add delete here  edit also*/}
        </div>
      ))}
    </div>
  );
}