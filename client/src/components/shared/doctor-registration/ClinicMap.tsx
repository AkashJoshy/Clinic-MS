import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
  type SetStateAction,
} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useDoctorRegistrationContext } from "@/contexts/useDoctorRegistrationContext";
interface ClinicPositionProps {
  position: {
    lat: number;
    lng: number;
  };
  setPosition: React.Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}
const DEFAULT_POSITION = { lat: 0, lng: 0 };

function buildClinicIcon(dragging: boolean) {
  const html = `
    <div class="relative -rotate-45 flex items-center justify-center w-10 h-10 rounded-full rounded-bl-none border-[3px] border-white bg-teal-500 shadow-lg shadow-teal-900/40 transition-transform duration-150 ${
      dragging ? "scale-110" : ""
    }">
      <div class="rotate-45">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="white" d="M12 2a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm-1 9H9v2h2v2h2v-2h2v-2h-2V9h-2v2Z" />
        </svg>
      </div>
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -38],
  });
}

function LocateButton({
  onLocate,
}: {
  onLocate: (pos: { lat: number; lng: number }) => void;
}) {
  const {
    step2Form: { setValue },
  } = useDoctorRegistrationContext();
  const map = useMap();
  const [busy, setBusy] = useState(false);

  const handleClick = useCallback(() => {
    setBusy(true);
    map.locate({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
    map.once("locationfound", () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocate({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setValue("latitude", String(pos.coords.latitude));
          setValue("longitude", String(pos.coords.longitude));
        },
        (error) => {
          console.log(error);
        },
      );
      setBusy(false);
    });
    map.once("locationerror", () => setBusy(false));
  }, [map, onLocate]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Use my current location"
      title="Use my current location"
      className="absolute top-3 right-3 z-1000 grid h-9 w-9 place-items-center rounded-lg bg-white text-gray-700 shadow-md transition hover:scale-105 hover:text-teal-600 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className={busy ? "animate-spin" : ""}
      >
        <path
          fill="currentColor"
          d="M12 2a1 1 0 0 1 1 1v1.06A8.01 8.01 0 0 1 19.94 11H21a1 1 0 1 1 0 2h-1.06A8.01 8.01 0 0 1 13 19.94V21a1 1 0 1 1-2 0v-1.06A8.01 8.01 0 0 1 4.06 13H3a1 1 0 1 1 0-2h1.06A8.01 8.01 0 0 1 11 4.06V3a1 1 0 0 1 1-1Zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
        />
      </svg>
    </button>
  );
}

function RecenterMap({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    map.flyTo([position.lat, position.lng], map.getZoom(), { duration: 0.8 });
  }, [position.lat, position.lng]);

  return null;
}

const ClinicMap = ({ position, setPosition }: ClinicPositionProps) => {
  const [draggable, setDraggable] = useState<boolean>(true);
  const [justDropped, setJustDropped] = useState(false);
  const markerRef = useRef<L.Marker | null>(null);
  const icon = useMemo(() => buildClinicIcon(false), []);
  const {
    step2Form: { setValue },
  } = useDoctorRegistrationContext();

  const eventHandlers = useMemo(
    () => ({
      dragstart() {
        setJustDropped(false);
      },
      dragend() {
        const marker = markerRef.current;
        if (!marker) return;
        const newPosition = marker.getLatLng();
        setPosition({ lat: newPosition.lat, lng: newPosition.lng });
        setValue("latitude", String(newPosition.lat));
        setValue("longitude", String(newPosition.lng));
        setJustDropped(true);
        window.setTimeout(() => setJustDropped(false), 1200);
      },
    }),
    [setPosition],
  );

  if (!position) {
    return (
      <div className="flex h-125 w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
        Loading map...
      </div>
    );
  }

  const safePosition = {
    lat: Number(position?.lat ?? DEFAULT_POSITION.lat),
    lng: Number(position?.lng ?? DEFAULT_POSITION.lng),
  };

  return (
    <div>
      <div className="mb-3 mt-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Clinic location
          </h2>
          <p className="text-xs text-gray-500">
            {draggable
              ? "Drag the pin to set the exact location."
              : "Position locked. Unlock to move the pin."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDraggable((d) => !d)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            draggable
              ? "border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              draggable ? "bg-teal-500" : "bg-gray-400"
            }`}
          />
          {draggable ? "Unlocked" : "Locked"}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "500px", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <RecenterMap position={safePosition} />
          <LocateButton onLocate={setPosition} />

          <Marker
            ref={markerRef}
            draggable={draggable}
            position={safePosition}
            icon={icon}
            eventHandlers={eventHandlers}
          >
            <Popup>Clinic Location</Popup>
          </Marker>
        </MapContainer>

        {justDropped && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-[1000] -translate-x-1/2 rounded-full bg-gray-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-md">
            Position updated
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Latitude
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-gray-900">
            {safePosition.lat.toFixed(6)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Longitude
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-gray-900">
            {safePosition.lng.toFixed(6)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicMap;
