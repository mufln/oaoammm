const getTimetable = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const timetable = await response.json(); // Преобразуем ответ в JSON
      return timetable; // Возвращаем массив расписание
    } else {
      throw new Error('Не удалось получить расписание');
    }
  }
  catch (error) {
    console.error('Ошибка при получении расписания:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};



type Affiliation  = {
  id: number,
  name: string
}

type Institut = {
  id: number,
  name: string,
  affiliationId: number,
  affiliation: Affiliation
}

type Specialty = {
    id: number,
    name: string,
    institutId: number,
    institut: Institut
}

type Campus = {
  id: number,
  address: string,
  affiliationId: number
}

type Room = {
  id: number,
  name: string,
  campusId: number,
  campus: Campus
}

type Class = {
    id: number,
    name: string,
    hours: number,
    terms: [
      number
    ],
    specialtyId: number,
    specialty: Specialty
    slotType: number
}

type Group =
{
    id: number;
  name: string;
  institutId: number;
  institut: Institut;
  specialtyId: number;
  specialty: Specialty;
  course: number; 
}

type User =
{
    id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  login: string;
  groupId: number;
  group: Group;
  role: number;
}

type Lecturer = {
    id: number;
    userId: number;
    user: User;
    classesId: number[];
    classes: Class[];
    hoursPerWeek: number;
    institutionId: number;
    institut: Institut;
}

type Lesson = {
    id: number;
    roomId: number;
    room: Room;
    classId: number;
    class: Class;
    groupIds: number[];
    groups: Group[];
    lecturerId: number;
    lecturer: Lecturer;
    campusId: number;
    campus: Campus;
    affiliationId: number;
    affiliation: Affiliation;
    week: number;
    day: number;
    slot: number;
    slotType: number;
}

type Day = {lessons: Lesson[]}

type BdTimeTable = {day: Day[]}

interface bdTimeTable {
    day: Day[]
}

type frontLesson = {
    subject: string
    teacher: string
    room: string
    startTime: string
    endTime: string
}

type frontDay = {
    number: number
    lessons: frontLesson[]
}

type frontWeek = {
    number: number
    days: frontDay[]
}


type frontGroup = {
    name: string
    weeks: frontWeek[]
}

function defineLessonTime(timeSlot: number): string {
    switch (timeSlot) {
        case 1:
            return '09:00 10:30'
        case 2:
            return '10:40 12:10'
        case 3:
            return '12:40 14:10'
        case 4:
            return '14:20 15:50'
        case 5:
            '16:20 17:50'
        case 6:
            return '18:00 19:30'
        case 7:
            return '20:00 21:30'
        default:
            return 'Я хз'
    }
}

const transformToFrontGroups = (bdTimeTables: BdTimeTable[]): frontGroup[] => {
      const frontGroups: frontGroup[] = [];
    
      bdTimeTables.forEach(bdTimeTable => {
        bdTimeTable.day.forEach(day => {
          day.lessons.forEach(lesson => {
            lesson.groups.forEach(group => {
              // Проверяем, существует ли группа в frontGroups
              let frontGroupIndex = frontGroups.findIndex(item => item.name === group.name);
              
              // Если группа не найдена, создаем новую
              if (frontGroupIndex === -1) {
                const newFrontGroup: frontGroup = {
                  name: group.name,
                  weeks: Array.from({ length: 23 }, (_, weekIndex) => ({
                    number: weekIndex + 1,
                    days: Array.from({ length: 6 }, (_, dayIndex) => ({
                      number: dayIndex + 1,
                      lessons: [] // Инициализируем пустой массив для уроков
                    }))
                  }))
                };
                frontGroups.push(newFrontGroup);
                frontGroupIndex = frontGroups.length - 1; // Обновляем индекс группы
              }
    
              // Получаем текущую неделю и день
              const weekIndex = lesson.week - 1; // Индекс недели (недели начинаются с 1)
              const dayIndex = lesson.day - 1; // Индекс дня (дни начинаются с 1)
            const toSplit = defineLessonTime(lesson.slot).split(' ');

              // Создаем новый урок для добавления
              const newLesson = {
                subject: lesson.class.name,
                teacher: lesson.lecturer.user.name, // Имя преподавателя
                room: lesson.room.name, // Имя комнаты
                
                startTime: toSplit[0], // Время начала
                endTime: toSplit[1], // Время окончания
              };
    
              // Добавляем урок в соответствующий день и неделю
              frontGroups[frontGroupIndex].weeks[weekIndex].days[dayIndex].lessons.push(newLesson);
            });
          });
        });
      });
    
      return frontGroups;
};





export default function Groups() {
  const timetable = getTimetable();

  console.log(timetable);

  const  newGroups = transformToFrontGroups(timetable);
  console.log(newGroups);
  return (
    <div>
      <h1>Groups</h1>
    </div>
  )
}