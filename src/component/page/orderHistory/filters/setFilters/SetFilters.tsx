import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import StartDate from './setFilter/StartDate';
import EndDate from './setFilter/EndDate';
import Status from './setFilter/Status';
import OrderedBy from './setFilter/OrderedBy';
import FileExtention from './setFilter/FileExtention';
import FileName from './setFilter/FileName';
import FilterListIconWithLeftMargin from './../FilterListIconWithLeftMargin';
import Text from './../../../../../text/language/Text';
import TextContext from './../../../../../text/TextContext';
import Typography from '@material-ui/core/Typography';
import { FilterStep, FilterStepMap, filterStepIndex, filterSteps } from '../../../../../store/orderFilter/setOrderFilter/setFilterStep';
import { makeStyles } from '@material-ui/core/styles';
import { configure } from './../../../../utils';
import { connect } from 'react-redux';
import { State, selectSetOrderFilter } from './../../../../../store/reducer';
import { selectSetFilterStep, selectIsOrderFilterEmpty, previousFilterStep, nextFilterStep } from '../../../../../store/orderFilter/setOrderFilter/orderFilter';
import { setCurrentOrderFilter } from '../../../../../store/orderFilter/orderFilter';

interface SetFilterStepProps {
    currentFilterStep: FilterStep, 
    disableNext: boolean,
    onBack: () => void,
    onNext: () => void,
    onSetFilters: () => void,
    filterStepIndex: FilterStepMap<number>,
    filterSteps: Array<FilterStep>
}

const stepContent: FilterStepMap<(text: Text) => React.ReactElement> = {
    'start-date': _ => <StartDate />,
    'end-date': _ => <EndDate />,
    'status': text => <Status text={text.orderStatus} />,
    'ordered-by': _ => <OrderedBy />,
    'file-extention': _ => <FileExtention />,
    'file-name': text => (
        <FileName
            label={text.orderFilter.fileName}
            placeholder={text.fileNamePatternPlaceholder} />
    )
};

const labelMap: FilterStepMap<keyof Text['orderFilterStepLabel']> = {
    'start-date': 'pickStartingDate',
    'end-date': 'pickEndDate',
    'status': 'pickOrderStatus',
    'ordered-by': 'pickOrderedBy',
    'file-extention': 'pickFileExtention',
    'file-name': 'pickFileName'
};

const useStyles = makeStyles(theme => ({
    actionsContainer: {
        marginBottom: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
    }
}));

const SetFilterStep: React.FC<SetFilterStepProps> = ({
    currentFilterStep,
    disableNext,
    onBack,
    onNext,
    onSetFilters,
    filterStepIndex,
    filterSteps
}) => {
    const classes = useStyles();
    const currentStepIndex = filterStepIndex[currentFilterStep];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === (filterSteps.length - 1);
    return (
        <TextContext.Consumer>
            {text => (
                <React.Fragment>
                    <Typography variant="h4" align="center">
                        {text.ordersSearchFilters}
                    </Typography>
                    <Stepper activeStep={currentStepIndex} orientation='vertical'>
                        {filterSteps.map(filterStep => (
                            <Step key={filterStep}>
                                <StepLabel>
                                    {text.orderFilterStepLabel[labelMap[filterStep]]}
                                </StepLabel>
                                <StepContent>
                                    {stepContent[filterStep](text)}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                variant='contained'
                                                color='default'
                                                disabled={isFirstStep}
                                                onClick={onBack}
                                                className={classes.button}>
                                                    {text.action.back}
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                disabled={disableNext}
                                                onClick={isLastStep ? onSetFilters : onNext}
                                                className={classes.button}>
                                                    {isLastStep
                                                        ? (
                                                            <React.Fragment>
                                                                {text.action.applyFilters}
                                                                <FilterListIconWithLeftMargin />
                                                            </React.Fragment>
                                                        ) : text.action.next
                                                    }
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </React.Fragment>
            )}
        </TextContext.Consumer>
    );
};

const ConfiguredSetFilterStep = configure(SetFilterStep, {
    filterStepIndex,
    filterSteps
});

const SetFilter = connect(
    (state: State) => {
        const orderFilter = selectSetOrderFilter(state);
        const currentFilterStep = selectSetFilterStep(orderFilter);
        const disableNext = !selectIsOrderFilterEmpty(orderFilter);
        return {
            currentFilterStep,
            disableNext
        };
    }, {
        onBack: previousFilterStep,
        onNext: nextFilterStep,
        onSetFilters: setCurrentOrderFilter
    }
)(ConfiguredSetFilterStep);

export default SetFilter;
