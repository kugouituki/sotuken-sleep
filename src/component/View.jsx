import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function View(){

    const ref1 = useRef();
    
    useFrame(() => {
        ref1.current.rotation.x += 0.05; 
    })
    
    return(


        <Box ref={ref1} args={[1, 1, 1]}>
            <meshStandardMaterial color="hotpink"/>

        </Box>
        /*<mesh ref={ref1}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>*/
    )
}