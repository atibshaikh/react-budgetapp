import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard  from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const {budgets} = useBudgets();
  return (
    <>
      <Container className="my-4">
          
          <Stack direction="horizontal" gap={3} className="mb-4">
            <h1 className='me-auto'>Budgets</h1>  
            <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary">Add Expense</Button>
          </Stack>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300,1fr))", gap:"1rem", alignItems:"flex-start"}}>
            {budgets.map(budget => (
                <BudgetCard 
                name="Entertainment" 
                gray 
                amount={650} 
                max={1000} />
            ))}
            
          </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    </>
  )
}

export default App;
