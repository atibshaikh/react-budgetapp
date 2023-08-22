import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard  from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetsContext";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setExpenseModalBudgetId] = useState();


  function openAddExpenseModal (budgetId){
    setShowAddExpenseModal(true);
    setExpenseModalBudgetId(budgetId);
  }

  const {budgets, getBudgetExpenses} = useBudgets();
  return (
    <>
      <Container className="my-4">
          
          <Stack direction="horizontal" gap={3} className="mb-4">
            <h1 className='me-auto'>Budgets</h1>  
            <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
          </Stack>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300,1fr))", gap:"1rem", alignItems:"flex-start"}}>
            {budgets.map(budget => {

              //here we got all the expenses using getBudgetExpenses function which is used in context, it will return array
              // so by using reduce function we sum of that arrays data and return single amount

              const amount = getBudgetExpenses(budget.id).reduce( (total,expense) => total + expense.amount, 0);
                return (
                    <BudgetCard 
                      id={budget.id}
                      name={budget.name} 
                      amount={amount} 
                      max={budget.max}
                      onAddExpenseClick = { () => openAddExpenseModal(budget.id)}
                    />
                )

            })}
            <UncategorizedBudgetCard 
                 onAddExpenseClick = {openAddExpenseModal}
            />
            <TotalBudgetCard />

          </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal} 
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)} 
        />
    </>
  )
}

export default App;
