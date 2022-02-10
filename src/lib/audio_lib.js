function initListener(audioCtx, position, orientation){
    listener = audioCtx.listener;

    // init the positions
    if(listener.positionX) {
        listener.positionX.value = position.posX;
          listener.positionY.value = position.posY;
          listener.positionZ.value = position.posZ;
      } else {
        listener.setPosition(position.posX, position.posY, position.posZ);
      }

    // init orientation
    if(listener.forwardX) {
    listener.forwardX.value = orientation.fwdX;
        listener.forwardY.value = orientation.fwdY;
        listener.forwardZ.value = orientation.fwdZ;
        listener.upX.value = orientation.upX;
        listener.upY.value = orientation.upY;
        listener.upZ.value = orientation.upZ;
    } else {
    listener.setOrientation(orientation.fwdX, orientation.fwdY, orientation.fwdZ, orientation.upX,orientation.upY,orientation.upZ);
    }
    return (listener);
}

function initPannerNode(audioCtx, position, orientation){
    //Default parameters of the pannerNode / audio source 
    const pannerModel = 'HRTF';

	const innerCone = 40;
	const outerCone = 50;
	const outerGain = 0.4;

	const distanceModel = 'linear';

	const maxDistance = 20000;

	const refDistance = 1;

	const rollOff = 10;

	const positionX = position.posX;
	const positionY = position.posY;
	const positionZ = position.posZ;

	const orientationX = orientation.X;
	const orientationY = orientation.Y;
	const orientationZ = orientation.Z;

    // Init the panner using the parameters

    const panner = new PannerNode(audioCtx, {
		panningModel: pannerModel,
		distanceModel: distanceModel,
		positionX: positionX,
		positionY: positionY,
		positionZ: positionZ,
		orientationX: orientationX,
		orientationY: orientationY,
		orientationZ: orientationZ,
		refDistance: refDistance,
		maxDistance: maxDistance,
		rolloffFactor: rollOff,
		coneInnerAngle: innerCone,
		coneOuterAngle: outerCone,
		coneOuterGain: outerGain
	})

    return(panner);
}

function moveSource(direction ,panner, bounds, steps){
    switch(direction){
        case 'left':
            if (panner.positionX > bounds.left){
                panner.positionX -= steps.X;
            }
        break;
        case 'right':
            if (panner.positionX < bounds.right){
                panner.positionX += steps.X;
            }
        break;
        case 'up':
            if (panner.positionY < bounds.up){
                panner.positionX += steps.Y;
            }
        break;
        case 'down':
            if (panner.positionY > bounds.down){
                panner.positionX -= steps.Y;
            }
        break;
        case 'forward':
            if (panner.positionZ < bounds.forward){
                panner.positionZ += steps.Z;
            }
        break;
        case 'backward':
            if (panner.positionZ > bounds.backward){
                panner.positionZ -= steps.Z;
            }
        break;
    }
}

export {initListener, initPannerNode, moveSource}