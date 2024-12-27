import { PlusIcon } from "./icons/PlusIcon"
import { Button } from "./components/Buttons"
import { ShareIcon } from "./icons/ShareIcon"
function App() {

  return <div>
    <Button variant="primary" text="Add content" startIcon={<PlusIcon/>}></Button>
    <Button variant="secondary" text="Share" startIcon={<ShareIcon/>}></Button>
  </div>
}

export default App
