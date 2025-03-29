'use client'

import { useRouter } from "next/navigation"
import MenuItemCard from "./MenuItemCard"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { useUser } from "@clerk/nextjs"
import Loading from "./Loading"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"


const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const zeroPrefix = (a: number) => {
  if (a < 10)
    return `0${a}`
  else
    return `${a}`
}

const MainMenu = () => {
  const { user } = useUser()
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [meetingState, setMeetingState] = useState<'Schedule' | 'Instant' | undefined>(undefined);
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user) return router.push('/login')
    if (!client) return router.push('/')

    try {
      if (!values.dateTime) {
        toast('لطفا زمان و تاریخ را انتخاب کنید', {
          duration: 3000,
          className: 'bg-gray-300 rounded-3xl py-8 px-5 justify-center'
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'بدون شرح';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      await call.updateCallMembers({
        update_members: [{ user_id: user.id }],
      })

      if (meetingState === 'Instant') {
        router.push(`/meeting/${call.id}`);
        toast('برپایی یک نشست', {
          duration: 3000,
          className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
        });
      }

      if (meetingState === 'Schedule') {
        router.push('/upcoming')
        toast(`نشت در تاریخ ${values.dateTime} برنامه ریزی شده است`, {
          duration: 5000,
          className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
        });
      }

    } catch (err: any) {
      toast(`خطا در ایجاد نشست ${err.message}`, {
        duration: 3000,
        className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
      }
      )
    }



  }

  useEffect(() => {
    if (meetingState) {
      createMeeting();
    }
  }, [meetingState]);

  if (!client || !user) return <Loading />;

  const Year = values.dateTime.getFullYear();
  const Month = zeroPrefix(values.dateTime.getMonth() + 1);
  const Day = zeroPrefix(values.dateTime.getDate());
  const Hour = zeroPrefix(values.dateTime.getHours());
  const Minute = zeroPrefix(values.dateTime.getMinutes());
  const dateValue = `${Year}-${Month}-${Day}T${Hour}:${Minute}`

  return (
    <section className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <Dialog>
        <DialogTrigger >
          <MenuItemCard
            img="/assets/new-meeting.svg"
            title="نشست جدید"
            bgColor='bg-orange-500'
            hoverColor='hover:bg-orange-800'
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 rounded-2xl">
          <DialogHeader>
            <DialogTitle className='text-3xl font-black leading-relaxed text-center'>
              شروع یک نشست آنی 🤝
            </DialogTitle>
            <DialogDescription>
              <div className="mb-5">
                <label className="block my-2 text-left rtl:text-right text-base font-normal text-gray-900 dark:text-white">شرح نشست</label>
                <Textarea
                  id='details'
                  placeholder="شرح نشت را وارد کنید..."
                  rows={4}
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
              <Button
                className='mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-75 duration-700 hover:-translate-y-1 cursor-pointer'
                onClick={() => setMeetingState('Instant')}
              >
                ایجاد نشست
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog >
        <DialogTrigger>
          <MenuItemCard
            img="/assets/join-meeting.svg"
            title="پیوستن به یک نشست"
            bgColor="bg-blue-600"
            hoverColor='hover:bg-blue-800'

          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 rounded-2xl">
          <DialogHeader>
            <DialogTitle className='text-3xl font-black leading-relaxed text-center mb-5 '>
              پیوند نشست را وارد کنید
            </DialogTitle>
            <DialogDescription className='flex flex-col gap-3 items-center'>
              <Input
                type='text'
                placeholder="پیوند نشست"
                onChange={(e) => setValues({ ...values, link: e.target.value })}
                className='inputs'
              />

              <Button
                className='mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-75 duration-700 hover:-translate-y-1 cursor-pointer'
                onClick={() => router.push(values.link)}
              >
                پیوستن
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/assets/calendar.svg"
            title="زمانبندی نشست آتی"
            bgColor="bg-blue-600"
            hoverColor='hover:bg-blue-800'
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 rounded-2xl">
          <DialogHeader>
            <DialogTitle className='text-3xl font-black leading-relaxed text-center'>
              زمانبندی یک نشست
            </DialogTitle>
            <DialogDescription>
              <div className="mb-5">
                <label className="block my-2 text-left rtl:text-right text-base font-normal text-gray-900 dark:text-white">شرح نشست</label>

                <Textarea
                  id="details"
                  className='inputs'
                  placeholder="شرح نشست را وارد کنید..."
                  rows={4}
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-col gap-2.5">
                <label className="block my-2 text-left rtl:text-right text-base font-normal text-gray-900 dark:text-white">
                  انتخاب تاریخ و زمان نشست
                </label>
                <input type="datetime-local" value={dateValue} onChange={(e) => {
                  setValues({ ...values, dateTime: new Date(e.target.value) })
                }} />
              </div>
              <Button className='!mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-75 duration-700 hover:-translate-y-1 cursor-pointer'
                onClick={() => setMeetingState('Schedule')}
              >
                ارسال
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <MenuItemCard
        img="/assets/recordings2.svg"
        title="ضبط یک نشست"
        bgColor="bg-blue-600"
        hoverColor='hover:bg-blue-800'
        handleClick={() => router.push('/recordings')}
      />
    </section>
  )
}

export default MainMenu