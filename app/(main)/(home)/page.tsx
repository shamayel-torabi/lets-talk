import { Card } from "@/components/Card"
import MainMenu from "@/components/MainMenu"
import StatusBar from "@/components/StatusBar"
import { Calendar } from "@/components/ui/date-picker/calendar"

const HomePage = () => {
    return (
        <section className="grid grid-cols-1 gap-5 md:gap-10 lg:grid-cols-3 animate-fade-in">
            <Card>
                <StatusBar />
            </Card>
           <Card className="h-full grid grid-cols-1 justify-items-center content-center">
                <MainMenu />
            </Card>
            <Card className="h-full grid grid-cols-1 justify-items-center content-center">
                <Calendar mode="single" selected={new Date()} />
            </Card>
        </section>
    )
}

export default HomePage