const timeInMinutes = (time) => {
  time = time.split(':');
  return time.length > 1
    ? time[0] * 60 + +time[1]
    : time[0] * 60;
};

const isMeetingAvailable = (
  startWorking = '8',
  endWorking = '17',
  startMeeting = '',
  meetingDuration = 0
) => {
  let data = [startWorking, endWorking, startMeeting];
  data = data.map(timeInMinutes);
  const isMeetingStartValid = data[2] >= data[0] && data[2] <= data[1];
  const isMeetingDurationValid = data[1] >= data[2] + meetingDuration
    && meetingDuration > 0;

  return isMeetingStartValid && isMeetingDurationValid;
};

isMeetingAvailable('08:00', '17:30', '14:00', 90); // true
isMeetingAvailable('8:0', '10:0', '8:0', 120); // true
isMeetingAvailable('08:00', '14:30', '14:00', 90); // false
isMeetingAvailable('14:00', '17:30', '08:0', 90); // false
isMeetingAvailable('8:00', '17:30', '08:00', 900); // false
isMeetingAvailable('9', '16', '10:15', 1); // true
isMeetingAvailable('9', '16', ''); // false
isMeetingAvailable(); // false
