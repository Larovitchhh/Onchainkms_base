import ActivityForm from "../components/ActivityForm"

export default function Home() {

  return (

    <main className="container">

      <div className="hero">

        <h1>onchainKms</h1>

        <p>
          Track your sport activity onchain and earn XP
        </p>

      </div>

      <div className="card">

        <ActivityForm />

      </div>

    </main>

  )
}
