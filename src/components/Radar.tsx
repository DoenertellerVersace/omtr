import {
  AppCallbacks,
  ApplicationProperties,
  ItemCallbacks,
  ItemDTO,
  QuadrantDTO,
  RadarQuadrant,
  RadarSlice
} from "../d";
import {JSX, MouseEventHandler} from "react";
import {computed, Signal} from "@preact/signals-react";




function Radar(props: {
  data: Readonly<ApplicationProperties>, callbacks: AppCallbacks
}): JSX.Element {
  function positionItemBlip(quadrant: RadarQuadrant, slice: RadarSlice, centerX: number, centerY: number): {
    x: number,
    y: number
  } {
    function getRandomRadius(from: number, to: number) {
      let res: number = -1;
      while (res < from) {
        res = to * Math.sqrt(Math.random())
      }
      return res;
    }

    let r: number;
    switch (slice) {
      case RadarSlice.OUTER:
        r = getRandomRadius(320, 430);
        break;
      case RadarSlice.MIDDLE:
        r = getRandomRadius(170, 280);
        break;
      case RadarSlice.INNER:
        r = getRandomRadius(20, 130);
        break;
      default:
        throw new Error("Invalid slice");
    }

    function getTheta(quadrant: RadarQuadrant) {
      let theta = -1

      function doesntFit(theta: number) {
        switch (quadrant) {
          case RadarQuadrant.UPPER_LEFT:
            return theta > Math.PI / 2
          case RadarQuadrant.UPPER_RIGHT:
            return theta < Math.PI / 2
          case RadarQuadrant.LOWER_LEFT:
            return theta > 3 * Math.PI / 2
          case RadarQuadrant.LOWER_RIGHT:
            return theta < 3 * Math.PI / 2
          default:
            throw new Error("Invalid quadrant")
        }
      }

      while (doesntFit(theta) ) {
        theta = Math.random() * 2 * Math.PI
      }
      return theta;
    }

    let theta = getTheta(quadrant)
    let x = centerX + r * Math.cos(theta)
    let y = centerY + r * Math.sin(theta)
    return ({
      x: x,
      y: y,
    });
  }

  const radar_HEIGHT: Signal<number> = computed(() => document.body.clientHeight);
  const radar_CENTER: Signal<number> = computed(() => radar_HEIGHT.value / 2);

  return (
      <div className="Radar">
        <svg width={radar_HEIGHT.value} height={radar_HEIGHT.value}>
          <circle color="black" cx={radar_CENTER.value} cy={radar_CENTER.value} r={450}
                  strokeWidth={3}/>
          <circle color="grey" cx={radar_CENTER.value} cy={radar_CENTER.value} r={300}
                  strokeWidth={3}/>
          <circle color="grey" cx={radar_CENTER.value} cy={radar_CENTER.value} r={150}
                  strokeWidth={3}/>
          <circle cx={radar_CENTER.value} cy={radar_CENTER.value} r={7} fill={"black"}/>
          <line x1={50} y1={radar_CENTER.value} x2={950} y2={radar_CENTER.value} color="grey"/>
          <line x1={radar_CENTER.value} y1={950} x2={radar_CENTER.value} y2={50} color="grey"/>
          {
            [props.data.left_upper, props.data.right_upper,
              props.data.left_lower, props.data.right_lower]
            .map((quadrant: QuadrantDTO<RadarQuadrant>, index: number) => {
              return (
                  props.data.left_lower.items.map((item: ItemDTO, index: number) => {
                    const position: {
                      x: number,
                      y: number
                    } = positionItemBlip(quadrant.quadrant, item.slice, radar_CENTER.value, radar_CENTER.value);
                    return (
                        <circle key={item.id}
                                cx={position.x} cy={position.y} r={5}
                                strokeWidth={5} fill={"blue"}
                                onMouseEnter={props.callbacks.onMouseEnter}
                                onMouseLeave={props.callbacks.onMouseLeave}
                                onClick={props.callbacks.onClick}
                        />
                    )
                  }))
            })
          }


        </svg>
      </div>
  );
}

export default Radar;