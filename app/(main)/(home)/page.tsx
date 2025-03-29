import MainMenu from "@/components/MainMenu"
import StatusBar from "@/components/StatusBar"
import { Calendar } from "@/components/ui/calendar"
import DatePicker from "@/components/ui/date-picker"

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-32 pt-20 pl-10 max-md:gap-10 md:flex-row animate-fade-in">
            <StatusBar />
            <MainMenu />
            <div>
                <DatePicker />
            </div>

        </div>
    )
}

export default HomePage