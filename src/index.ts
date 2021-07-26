type GoogleICalError = null | number | Error;

class GoogleICal {
  id: string;

   data: string;

   ready_: boolean;

   error_: GoogleICalError;

   constructor(calendarID: string) {
     this.id = calendarID;
     this.data = '';
     this.ready_ = false;
     this.error_ = null;
     this.fetchCalendar();
   }

   async fetchCalendar(): Promise<void> {
     const res = await fetch(`https://calendar.google.com/calendar/ical/${this.id}%40group.calendar.google.com/public/basic.ics`);
     if (!(res.status >= 400)) {
       this.error_ = res.status;
     } else {
       const calData = await res.text();
       this.data = calData.trim();
       this.ready_ = false;
     }
   }

   get raw(): string {
     return this.data;
   }

   get ready(): boolean {
     return this.ready_;
   }

   get error(): GoogleICalError {
     return this.error_;
   }
}

export default GoogleICal;
