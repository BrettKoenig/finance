import React from 'react'
import Data from './data'
import './App.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const App: React.FC = () => {
  return (<Tabs>
      <TabList>
        <Tab>Expense</Tab>
        <Tab>Accounts</Tab>
        <Tab>Budgets</Tab>
        <Tab>Goals</Tab>
      </TabList>

      <TabPanel>
        <Data name={'expense'} />
      </TabPanel>
      <TabPanel>
        <Data name={'account'} />
      </TabPanel>
      <TabPanel>
        <Data name={'budget'} />
      </TabPanel>
      <TabPanel>
        <Data name={'goal'} />
      </TabPanel>
    </Tabs>
  )
}

export default App
