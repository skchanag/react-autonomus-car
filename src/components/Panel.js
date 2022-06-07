import { React, useContext } from 'react';
import Button from './Button';
import Dropdown from './Dropdown';
import classes from './Panel.module.css';
import ResultContext from '../store/ResultContext';

function Panel() {
  const resultCtx = useContext(ResultContext);
  const dropdownDetails = [
    { text: 'Empty Route', api: 'empty-route' },
    { text: 'Success No Obstacles', api: 'success-no-obstacles' },
    { text: 'Success With Obstacles', api: 'success-with-obstacles' },
    { text: 'Failure Out Of Bounds', api: 'failure-out-of-bounds' },
    { text: 'Failure Hits Obstacle', api: 'failure-hits-obstacle' },
    { text: 'Random', api: 'random' },
  ];

  // To detemine if the simulation will end successfully or if it will fail
  const checkSimulation = (route) => {
    // Default position of the car is position 0 on lane 'b'
    const result = { status: 'success', lane: 'b', position: 0 };

    // Empty route case
    if (route.track.length === 0 && route.travelLog.length === 0) {
      return result;
    }

    // Sort track array and travellog array in ascending order with position
    const sortedTrack = route.track.sort((a, b) => a.position - b.position);
    const sortedTravelLog = route.travelLog.sort((a, b) => a.position - b.position);
    let maxPosition = 0;
    let currLane = 'b';
    let currLogIndex = 0;
    if (sortedTrack.length > 0) {
      maxPosition = sortedTrack[sortedTrack.length - 1].position;
    }
    if (sortedTravelLog.length > 0) {
      maxPosition = Math.max(maxPosition, sortedTravelLog[sortedTravelLog.length - 1].position);
    }

    // Create an travel array to store the current car lane at every position
    const travelArr = Array(maxPosition + 1);
    for (let i = 0; i < travelArr.length; i += 1) {
      // Lane Change
      if (currLogIndex < sortedTravelLog.length && i === sortedTravelLog[currLogIndex].position) {
        if (sortedTravelLog[currLogIndex].laneChange === 'left') {
          currLane = String.fromCharCode(currLane.charCodeAt(0) - 1);
        } else {
          currLane = String.fromCharCode(currLane.charCodeAt(0) + 1);
        }
        currLogIndex += 1;
      }
      // Check if currant lane is running out of bounds
      if (currLane < 'a' || currLane > 'c') {
        result.status = 'failure';
        result.lane = currLane < 'a' ? 'outLeft' : 'outRight';
        result.position = i;
        return result;
      }
      travelArr[i] = currLane;
    }

    // Check if the car hits an obstacle
    const hitObstacle = sortedTrack.find(
      (item) => item.obstacles.includes(travelArr[item.position]),
    );
    if (hitObstacle) {
      result.status = 'failure';
      result.lane = travelArr[hitObstacle.position];
      result.position = hitObstacle.position;
      return result;
    }

    result.lane = currLane;
    result.position = maxPosition;
    return result;
  };

  const fetchRoute = () => {
    // Display loading
    resultCtx.setIsLoading(true);
    // Reset the car position
    resultCtx.setStatus('');
    resultCtx.setPosition(0);
    resultCtx.setLane('b');
    resultCtx.setErrorMessage('');

    // Fetch route object from corresponding endpoints
    fetch(
      `http://localhost:5000/autonomous-car/routes/${resultCtx.currentSimulation}`,
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.route) {
          const result = checkSimulation(data.route);
          // Update the context state with the result
          resultCtx.setStatus(result.status);
          resultCtx.setPosition(result.position);
          resultCtx.setLane(result.lane);
          resultCtx.setErrorMessage('');
        }
      })
      .catch(() => {
        resultCtx.setErrorMessage('Oops! Something went wrong. Please try again.');
      })
      .finally(() => {
        resultCtx.setIsLoading(false);
      });
  };

  return (
    <div className={classes.panel} data-testid="panel">
      <span className={classes.label}>{'Simulation: '}</span>
      <Dropdown details={dropdownDetails} />
      <Button text="Start" btnOnClick={fetchRoute} />
    </div>
  );
}

export default Panel;
