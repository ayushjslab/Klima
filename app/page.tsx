import Header from "./_components/header"
import WeatherDashboard from "./_components/weather-dashboard"

const page = () => {
  return (
    <div>
      <Header/>
      <div className="mt-10 mx-10">
        <WeatherDashboard/>
      </div>
    </div>
  )
}

export default page
