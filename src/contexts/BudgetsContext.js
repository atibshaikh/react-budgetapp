import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";
const BudgetsContext =  createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets(){

    return useContext(BudgetsContext);

}



// {
//     id:
//     name:
//     max:
// }
// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets]= useLocalStorage("budgets", []);
    const [expenses, setExpenses]= useLocalStorage("expenses", []);

    //this will return all the expenses of specific budget box (it will return array)
    function getBudgetExpenses(budgetId){
        return expenses.filter( expense => expense.budgetId === budgetId )
    }

    function addExpense({description, amount, budgetId}){

        setExpenses( prevExpenses  => {
            return [...prevExpenses, {id:uuidv4(), description, amount, budgetId}]
        })

    }

    //for add budget get all previous budget and add new 
    function addBudget({ name,max }){
        
        setBudgets( prevBudgets  => {
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id:uuidv4(), name, max}]
        })
    }

    //for delete budget
    function deleteBudget({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.map( expense => {
                if(expense.budgetId != id) return expense
                return {...expense, budgetId:UNCATEGORIZED_BUDGET_ID}
            })
        })
        // TODO : Deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }

    function deleteExpense({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    }
    return (

    <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>

    )
    

     
}