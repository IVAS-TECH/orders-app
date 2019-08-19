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
import { FilterStep, FilterStepMap, filterStepIndex, filterSteps } from '../../../../../store/orderFilter/setOrderFilter/setFilterStep';
import { makeStyles } from '@material-ui/core/styles';
import { configure } from './../../../../utils';
import { connect } from 'react-redux';
import { State, selectSetOrderFilter } from './../../../../../store/reducer';
import { selectSetFilterStep, previousFilterStep, nextFilterStep } from '../../../../../store/orderFilter/setOrderFilter/orderFilter';
import { setCurrentOrderFilter } from '../../../../../store/orderFilter/orderFilter';

interface SetFilterStepProps {
    currentFilterStep: FilterStep, 
    onBack: () => void,
    onNext: () => void,
    onSetFilters: () => void,
    filterStepIndex: FilterStepMap<number>,
    filterSteps: Array<FilterStep>
}

const stepContent: FilterStepMap<React.ReactElement> = {
    'start-date': <StartDate />,
    'end-date': <EndDate />,
    'status': <Status />,
    'ordered-by': <OrderedBy />,
    'file-extention': <FileExtention />,
    'file-name': <FileName />
};

const label: FilterStepMap<string> = {
    'start-date': 'Pick starting date',
    'end-date': 'Pick end date',
    'status': 'Pick from the list with order statuses',
    'ordered-by': 'Pick from the list with Organization memebers',
    'file-extention': 'Pick from the list of file extentions',
    'file-name': 'Choose file name pattern'
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
        <Stepper activeStep={currentStepIndex} orientation='vertical'>
            {filterSteps.map(filterStep => (
                <Step key={filterStep}>
                    <StepLabel>
                        {label[filterStep]}
                    </StepLabel>
                    <StepContent>
                        {stepContent[filterStep]}
                        <div className={classes.actionsContainer}>
                            <div>
                                <Button
                                    variant='contained'
                                    color='default'
                                    disabled={isFirstStep}
                                    onClick={onBack}
                                    className={classes.button}>
                                        {'Back'}
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={isLastStep ? onSetFilters : onNext}
                                    className={classes.button}>
                                        {isLastStep
                                            ? (
                                                <React.Fragment>
                                                    {'Set filters'}
                                                    <FilterListIconWithLeftMargin />
                                                </React.Fragment>
                                            ) : 'Next'
                                        }
                                </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
};

const ConfiguredSetFilterStep = configure(SetFilterStep, {
    filterStepIndex,
    filterSteps
});

const SetFilter = connect(
    (state: State) => {
        const currentFilterStep = selectSetFilterStep(selectSetOrderFilter(state));
        return {
            currentFilterStep
        };
    }, {
        onBack: previousFilterStep,
        onNext: nextFilterStep,
        onSetFilters: setCurrentOrderFilter
    }
)(ConfiguredSetFilterStep);

export default SetFilter;
