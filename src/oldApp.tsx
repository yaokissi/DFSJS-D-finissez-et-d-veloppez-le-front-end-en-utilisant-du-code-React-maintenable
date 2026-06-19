import { useState, useEffect, type FC } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import {
  Chart as ChartJS,
  // ... imports
} from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'

// App.tsx ne doit gérer que le routing, import des librairies du projet 
ChartJS.register(
  ArcElement,
  // ...
)

// Extrait vers `src/app/data/mockData.ts`
// any a été remplacé par l'interface `Country[]` créée dans `src/app/models/olympics.ts`.
const olympicsData: any = [
]

//  Extrait vers src/app/pages/Home.tsx (Composant Smart).
const Home: FC = () => {
  
  // Remplacé par le Custom Hook `const { data, isLoading } = useOlympicsData();`

  const [data, setData] = useState<any>(null)

  // "extraite vers `src/app/hooks/useOlympicsData.ts`.
  
  useEffect(() => {
    console.log('Loading data...') 
    setTimeout(() => {
      setData(olympicsData)
      console.log('Data loaded:', olympicsData) 
    }, 500)
  }, [])

  // Conservé dans Home.tsx, mais typé avec `(country: Country)`.
  const calculateTotalMedals = (country: any) => {
    return country.participations.reduce(
      (sum: any, p: any) => sum + p.medalsCount,
      0,
    )
  }

  const totalParticipatingCountries = data ? data.length : 0
  const totalGamesEditions = 5

  // ✅ ACTION : Remplacé par `if (isLoading || !data)` grâce au Custom Hook.
  if (!data) {
    return <div>Chargement...</div>
  }

  // Conservé dans Home.tsx 
  const chartData = { /* ... */ }
  const chartOptions = { /* ... */ }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* bloc a été supprimé et remplacé par un composant `Indicator.tsx` */}

        {/* utilisation de map() sur le tableau `indicatorsData` pour générer ces cartes dynamiquement */}
        <div className="mb-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mb-2">
            <h3 className="text-xl font-semibold mb-2">Pays participants</h3>
            <p className="text-4xl font-bold text-blue-400">
              {totalParticipatingCountries}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Éditions des JO</h3>
            <p className="text-4xl font-bold text-green-400">
              {totalGamesEditions}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

// Extrait vers `src/app/pages/Country.tsx`.
const Country: FC = () => {
  const { id } = useParams()

  console.log('Loading country with id:', id) // 🗑️ Supprimé
  
  // Logique à déplacer dans un Hook métier ou à typée avec `Country `.
  const country: any = olympicsData.find((c: any) => c.id === Number(id))

  console.log('Country loaded:', country) 

  // ... (Même logique de refactoring que pour Home : typage, extraction des indicateurs avec le composant réutilisable Indicator, etc.)
  
  return (
    // ...
  )
}

// 
export const App: FC = () => {
  console.log('App rendered') 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}