import {
  React, createContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const ResultContext = createContext({
  status: '',
  position: 0,
  lane: '',
  isLoading: false,
  errorMessage: '',
  currentSimulation: '',
});

export function ResultContextProvider(props) {
  const { children } = props;
  const [status, setStatus] = useState('');
  const [position, setPosition] = useState(0);
  const [lane, setLane] = useState('b');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentSimulation, setCurrentSimulation] = useState('empty-route');

  const context = useMemo(() => ({
    status,
    position,
    lane,
    isLoading,
    errorMessage,
    currentSimulation,
    setStatus,
    setPosition,
    setLane,
    setIsLoading,
    setErrorMessage,
    setCurrentSimulation,
  }), [status, position, lane, isLoading, errorMessage, currentSimulation]);

  return (
    <ResultContext.Provider value={context}>
      {children}
    </ResultContext.Provider>
  );
}

ResultContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResultContext;
