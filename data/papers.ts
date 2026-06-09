export interface ResearchPaper {
  id: string;
  ref: string;
  title: string;
  journal: string;
  date: string;
  status: string;
  doi: string;
  abstract: string;
  tags: string[];
  introduction: string;
  methodology: string;
  results: string;
  references: string[];
}

export const papers: ResearchPaper[] = [
  {
    id: "PUB-001",
    ref: "ORB-SWARM-25",
    title: "Autonomous Orbital Dynamics and Collision Avoidance in LEO Cubesat Swarms",
    journal: "Journal of Spacecraft and Rockets",
    date: "2025.10.14",
    status: "PUBLISHED",
    doi: "10.2514/1.A35824",
    abstract: "Presents a decentralized path-planning formulation for micro-satellites orbiting in LEO. By employing local potential fields and neural-network perturbations approximation, we demonstrate collision avoidance and formation control with minimal propellant consumption.",
    tags: ["Orbital Mechanics", "Cubesats", "Swarm Robotics", "LEO Dynamics"],
    introduction: "As the density of Low Earth Orbit (LEO) satellite constellations increases, autonomous collision avoidance and formation flying become critical for mission safety and longevity. Traditional ground-based station-keeping methods introduce processing latencies and require continuous communication link availability. This paper details a decentralized on-board navigation scheme utilizing dynamic artificial potential fields combined with high-frequency approximation of external perturbations.",
    methodology: "We formulate the dynamics in the Hill-Clohessy-Wiltshire (HCW) frame to track relative orbits between satellite agents. To maintain constellation limits without central supervision, each cubesat models its neighbors as repulsive potential cores, while the orbital target configuration acts as an attractive well. A compact three-layer neural network runs in real-time on flight-grade Microcontrollers, predicting non-spherical Earth perturbations (J2-J4 harmonics) and atmospheric drag coefficients.",
    results: "Simulations were conducted for a swarm of 12 cubesats in a circular orbit at 550 km altitude. The autonomous potential field controller kept cross-track deviations below 2.5 meters while consuming 35% less cold-gas propellant compared to conventional proportional-derivative regulators. During simulated close-approach drift events, the system successfully navigated emergency maneuvers with zero ground operator intervention.",
    references: [
      "Clohessy, W. H., and Wiltshire, R. S., 'Terminal Guidance System for Satellite Rendezvous,' Journal of the Aerospace Sciences, Vol. 27, No. 9, 1960, pp. 653-658.",
      "Koon, W. S., Lo, M. W., Marsden, J. E., and Ross, S. D., Dynamical Systems, the Three-Body Problem and Space Mission Design, Marsden Books, 2011.",
      "Scharf, D. P., Hadaegh, F. Y., and Ploen, S. R., 'A Survey of Spacecraft Formation Flying Guidance,' Journal of Guidance, Control, and Dynamics, Vol. 27, No. 1, 2004, pp. 3-14."
    ]
  },
  {
    id: "PUB-002",
    ref: "ML-AERO-25",
    title: "Machine Learning Architectures for Real-Time Atmospheric Telemetry Analysis during Re-entry",
    journal: "IEEE Transactions on Aerospace and Electronic Systems",
    date: "2025.04.08",
    status: "PUBLISHED",
    doi: "10.1109/TAES.2025.30485",
    abstract: "Proposes an onboard lightweight transformer architecture to predict aerodynamic drag and thermal coefficients during spacecraft atmospheric entry. Demonstrates sub-millisecond inference times on flight-certified processors.",
    tags: ["Machine Learning", "Aerodynamics", "Telemetry Analysis", "Atmospheric Entry"],
    introduction: "Spacecraft atmospheric re-entry is characterized by extreme thermomechanical regimes, where real-time aerodynamic coefficients fluctuate rapidly due to hypersonic flow characteristics and ionization blackouts. Real-time predictions of drag (Cd) and lift (Cl) coefficients are essential for dynamic trajectory guidance. This study presents a specialized transformer network designed to process multi-channel telemetry streams directly on flight computers.",
    methodology: "We propose a localized temporal-attention transformer architecture optimized for hardware-in-the-loop applications. The input vector consists of atmospheric density estimates, pitch/yaw angles, stagnation pressure sensors, and inertial measurements. The model's weights were quantized to 8-bit integers (INT8) using post-training quantization to enable execution on ARM Cortex-R5 real-time cores.",
    results: "The transformer network achieved an R² score of 0.994 on simulated atmospheric coefficient targets. When compared against standard Navier-Stokes hypersonic solvers, the model reduced inference execution times from several minutes to under 0.85 milliseconds. In hardware-in-the-loop tests on flight-certified processors, power draw remained under 1.2 Watts during continuous computation loops.",
    references: [
      "Anderson, J. D., Hypersonic and High-Temperature Gas Dynamics, American Institute of Aeronautics and Astronautics, 2006.",
      "Vaswani, A., et al., 'Attention Is All You Need,' Advances in Neural Information Processing Systems, 2017, pp. 5998-6008.",
      "Regan, F. J., and Anadakrishnan, S. M., Dynamics of Atmospheric Re-Entry, AIAA Education Series, 1993."
    ]
  },
  {
    id: "PUB-003",
    ref: "PROP-EM-26",
    title: "Design and Characterization of a Low-Power Electromagnetic Propellant System for Nanosatellites",
    journal: "Acta Astronautica",
    date: "2026.02.19",
    status: "IN PRESS",
    doi: "10.1016/j.actaastro.2026.01.042",
    abstract: "Details the design, fabrication, and vacuum-chamber testing of an electromagnetic micro-thruster system utilizing solid propellants. Demonstrates stable micro-Newton thrust profiles with power inputs under 5 Watts.",
    tags: ["Propulsion", "Electromagnetics", "Nanosatellites", "Vacuum Testing"],
    introduction: "Nanosatellites require precise, low-impulse thrusters for active orbital maintenance and precise attitude stabilization. However, thermal and volume constraints restrict the use of conventional chemical engines. Electromagnetic micro-thrusters present a viable, highly controllable alternative. This paper describes the design and diagnostic validation of a solid-fed pulsed plasma thruster (PPT) designed for 3U cubesat platforms.",
    methodology: "A coaxially configured discharge chamber was engineered using a fluorocarbon-based solid propellant. Energy storage was achieved using a high-density ceramic capacitor bank charged via a custom step-up converter. Force measurement was conducted inside a high-vacuum chamber (1.2 x 10^-6 Torr) using a torsional pendulum equipped with a laser-interferometric displacement sensor.",
    results: "The prototype delivered a repeatable impulse bit of 22 micro-Newton-seconds (μN-s) per pulse at a charge energy of 4.2 Joules. The thruster operated continuously for over 150,000 pulses without signs of electrode erosion or dielectric breakdown. Total power consumption during continuous firing at 1 Hz remained below 4.6 Watts, fitting within typical power budgets for nanosatellite systems.",
    references: [
      "Jahn, R. G., Physics of Electric Propulsion, McGraw-Hill, 1968.",
      "Martinez-Sanchez, M., and Pollard, J. E., 'Spacecraft Electric Propulsion,' Journal of Propulsion and Power, Vol. 14, No. 5, 1998, pp. 688-699.",
      "Micci, M. M., and Ketsdever, A. D., Micropropulsion for Small Spacecraft, Progress in Astronautics and Aeronautics, Vol. 187, 2000."
    ]
  }
];
