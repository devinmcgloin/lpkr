import { XIcon } from '@heroicons/react/outline';

const items = [
  // { id: 0, title: 'Variables', methods: [] },

  {
    id: 1,
    title: 'Random',
    methods: [
      {
        name: 'random.value',
        arguments: [],
        notes:
          'Produce a random value between 0 (inclusive) and 1 (exclusive). This is functionally equivalent to Math.random(), except in the case that a seed has been set on the singleton, in which case a detemrinistic result is produced.',
      },
      {
        name: 'noise1D',
        arguments: ['x', 'frequency = 1', 'amplitude = 1'],
        notes:
          'Produces 1-dimensional random simplex noise with the simplex-noise module. This is equivalent to noise2D(x, 0). Optionally you can specify the frequency (which multiplies all coordinates by that value) and amplitude (which multiplies the output result by that value) of the noise signal.',
      },
      {
        name: 'random.noise2D',
        arguments: ['x', 'y', 'frequency = 1', 'amplitude = 1'],
        notes:
          'Produces 2-dimensional random simplex noise with the simplex-noise module.',
      },
      {
        name: 'random.boolean',
        arguments: [],
        notes: 'Uniformly produce either true or false values.',
      },
      {
        name: 'random.chance',
        arguments: ['probability = 0.5'],
        notes:
          'Produce random true or false values based on the given probability, where the closer it is to 1 the more likely you will get true, and the closer to 0 the more likely you will get false. The default probability is 0.5, which is functionally equivalent to random.boolean().',
      },
      {
        name: 'random.range',
        arguments: ['min', 'max'],
        notes:
          'Produces a random float value between min (inclusive) and max (exclusive). If only one argument is provided, the min is defaulted to 0, and that argument is used as the max.',
      },
      {
        name: 'random.rangeFloor',
        arguments: ['min', 'max'],
        notes:
          'Produces a random integer value between min integer (inclusive) and max integer (exclusive). If only one argument is provided, the min is defaulted to 0, and that argument is used as the max.',
      },
      {
        name: 'random.gaussian',
        arguments: ['mean = 0', 'std = 1'],
        notes:
          'Produces a random Gaussian distribution using mean and std for standard deviation.',
      },
      {
        name: 'random.pick',
        arguments: ['array'],
        notes: 'Picks a random element from the specified array.',
      },
      {
        name: 'random.shuffle',
        arguments: ['array'],
        notes:
          'Shallow copies the array, returning a randomly shuffled result. Does not modify the array in place.',
      },
    ],
  },
  {
    id: 2,
    title: 'Math',
    methods: [
      {
        name: 'math.mod',
        arguments: ['a', 'b'],
        notes:
          'Computes a % b but handles negatives and always returns a positive result, so that mod(-1, 4) will return 3 (instead of -1 with regular modulo).',
      },
      {
        name: 'math.fract',
        arguments: ['n'],
        notes:
          'Returns the fractional part of n, e.g. fract(40.25) will return 0.25. This is defined as x - floor(x)',
      },
      {
        name: 'math.clamp',
        arguments: ['n'],
        notes:
          'Clamps the number n between min (inclusive) and max (inclusive).',
      },
      {
        name: 'math.lerp',
        arguments: ['min', 'max', 't'],
        notes:
          'Linearly interpolates between min and max using the parameter t, where t is generally expected to be between 0..1 range. None of the inputs or outputs are clamped.',
      },
    ],
  },
  // { id: 4, title: 'CanvasRenderingContext2D', methods: [] },
];

export default function Documentation({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="w-screen max-w-md">
      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
        <div className="px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <h1 className="text-xl font-medium text-gray-900">Documentation</h1>
            <div className="ml-3 h-7 flex items-center">
              <button
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 relative flex-1 px-4 sm:px-6">
          <div className="absolute inset-0 px-4 sm:px-6">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="py-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.methods.map((method) => (
                    <div key={method.name} className="mt-1 font-mono py-1">
                      <div className="flex items-center text-sm font-bold">
                        {method.name}({method.arguments.join(', ')})
                      </div>
                      <div className="text-sm">{method.notes}</div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
