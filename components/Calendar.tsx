import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CalendarProps {
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (clickedDate >= today) {
            onDateSelect(clickedDate);
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-4">
                <button type="button" onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-blue-900/50 transition-colors" aria-label="Mes anterior">
                    <ChevronLeftIcon className="h-5 w-5 text-gray-300" />
                </button>
                <h3 className="text-lg font-semibold text-white capitalize">
                    {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
                <button type="button" onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-blue-900/50 transition-colors" aria-label="Mes siguiente">
                    <ChevronRightIcon className="h-5 w-5 text-gray-300" />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const cells = [];
        // Blank cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<div key={`blank-${i}`} className="w-8 h-8 md:w-10 md:h-10"></div>);
        }

        // Cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
            const isToday = date.getTime() === today.getTime();
            const isPast = date < today;

            const cellClasses = [
                'w-8 h-8 md:w-10 md:h-10', 'flex', 'items-center', 'justify-center', 'rounded-full', 'transition-colors', 'duration-200', 'text-sm',
                isPast ? 'text-gray-600 cursor-not-allowed' : 'text-gray-200 hover:bg-blue-900/50 cursor-pointer',
                isToday && !isSelected ? 'ring-1 ring-blue-500' : '',
                isSelected ? 'bg-blue-500 text-white font-bold' : ''
            ].join(' ');

            cells.push(
                <button
                    type="button"
                    key={day}
                    onClick={() => handleDateClick(day)}
                    disabled={isPast}
                    className={cellClasses}
                    aria-label={`Seleccionar ${day} de ${currentDate.toLocaleString('es-ES', { month: 'long' })}`}
                >
                    {day}
                </button>
            );
        }

        return <div className="grid grid-cols-7 gap-y-1 place-items-center">{cells}</div>;
    };

    return (
        <div className="bg-gray-900/50 p-2 sm:p-4 rounded-md border-2 border-dashed border-gray-700">
            {renderHeader()}
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-medium text-gray-400 mb-2">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>
            {renderDays()}
        </div>
    );
};

export default Calendar;