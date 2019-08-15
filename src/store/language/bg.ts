import Language from './Language';

const bg: Language = {
    language: {
        bg: 'Български',
        en: 'Английски',
        language: 'Език'
    },
    forms: {
        stencilForm: {
            filesArchive: 'Файлов архив',
            isFromRackelSide: 'Файлът е изглед от страна ракел',
            count: 'Брой',
            sheetThickness: 'Дебелина на листа',
            fidushalMarks: 'Добави Фидюшал марки',
            fidushalMarksKind: 'Вид на марките',
            fidushalMarksSide: 'Страна на марките',
            modificationsRequirements: 'Изисквания',
            modificationsRequirementsHelperText: 'Моля, опишете всички изисквания за модификации на апертурите и позиционирането на образа',
            includeTextFromRackelSide: 'Добави текст от страната на ракела',
            textFromRackelSide: 'Текст страна ракел (rackel)',
            includeTextFromPCBSide: 'Добави текст от страната на платката',
            textFromPCBSide: 'Текст страна платка (pcb)',
            multiply: 'Добави мултиплициране',
            panelsCountAxis: axis => `Брой панели по ${axis}`,
            stepAxis: axis => `Стъпка по ${axis} (mm)`,
            position: 'Позициониране',
            imagePosition: 'Позициониране на образа върху шаблона',
            nanoCoating: 'Нанопокритие',
            electrochemicalPolishing: 'Електрохимично полиране',
            options: {
                graved: 'Гравирани',
                cut: 'Прорязани',
                pcbSide: 'Страна платка (pcb)',
                rackelSide: 'Страна ракел (rackel)',
                twoSided: 'Двустранно',
                pcbCentered: 'PCB Centered',
                layoutCentered: 'Layout Centered'
            },
            title: 'Форма за поръчка на SMT стенсили',
            panelTitle: {
                template: 'Шаблон',
                fidushalMarks: 'Фидюшъл марки',
                modificationsRequirements: 'Изисквания за модификации на апертурите и позиционирането на образа',
                text: 'Текст',
                multiply: 'Мултиплициране',
                position: 'Позициониране',
                additionalProcessing: 'Допълнителна обработка'
            },
            previewOrder: 'Преглед на поръчката'
        },
        notSelected: subject => {
            switch(subject) {
                case 'he': return 'Не избран';
                case 'she': return 'Не избрана';
                case 'it': return 'Не избрано';
            }
        },
        fieldError: {
            required: 'Полето е задължително',
            min: min => `Минималната стойност на полето е ${min}`
        },
        warning: {
            formIsInvalid: 'Формата е невалидна',
            fieldValueIsInvalid: 'Има поле с невалидна стойност'
        }
    },
    action: {
        ok: 'Добре',
        makeOrder: 'Направи поръчка'
    },
    bool: b => b ? 'Да' : 'Не'
};

export default bg;