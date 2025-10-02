interface LightSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export function LightSwitch({ isOn, onToggle }: LightSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center justify-center"
      aria-label="Toggle light mode"
      style={{
        width: '50px',
        height: '90px',
        padding: '6px',
      }}
    >
      {/* Switch plate background */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          backgroundColor: isOn ? '#f5f5f5' : '#2a2a2a',
          transition: 'background-color 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      />

      {/* Switch toggle */}
      <div
        className="relative rounded-sm"
        style={{
          width: '24px',
          height: '48px',
          backgroundColor: isOn ? '#ffffff' : '#1a1a1a',
          transition: 'all 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOn
            ? '0 3px 6px rgba(0, 0, 0, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
            : '0 -3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.1)',
          transform: isOn ? 'translateY(-6px)' : 'translateY(6px)',
          border: `1.5px solid ${isOn ? '#e0e0e0' : '#333'}`,
        }}
      >
        {/* Switch detail lines */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '12px',
            height: '3px',
            backgroundColor: isOn ? '#d0d0d0' : '#444',
            borderRadius: '1px',
            transition: 'background-color 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* Screw details at top and bottom */}
      <div
        className="absolute rounded-full"
        style={{
          width: '5px',
          height: '5px',
          backgroundColor: isOn ? '#c0c0c0' : '#444',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'background-color 900ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '5px',
          height: '5px',
          backgroundColor: isOn ? '#c0c0c0' : '#444',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'background-color 900ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </button>
  );
}
