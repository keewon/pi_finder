#!/usr/bin/env python3
"""Generate e-data.js and sqrt2-data.js with 1,000,000 decimal digits each."""

import mpmath


def generate_constant(name, var_name, value_func, num_digits=1_000_000):
    """Generate a JS data file for a mathematical constant."""
    print(f"Computing {name} to {num_digits} decimal places...")
    mpmath.mp.dps = num_digits + 50  # extra precision to avoid rounding issues

    value = value_func()
    # Convert to string with enough digits
    digits_str = mpmath.nstr(value, num_digits + 2, strip_zeros=False)

    # Ensure we have exactly the right format: "X.ddddd..."
    dot_pos = digits_str.index('.')
    # Take integer part + "." + exactly num_digits decimal digits
    result = digits_str[:dot_pos + 1 + num_digits]

    # Verify format
    assert result[dot_pos] == '.', f"Expected dot at position {dot_pos}"
    assert len(result) == dot_pos + 1 + num_digits, \
        f"Expected {dot_pos + 1 + num_digits} chars, got {len(result)}"

    filename = f"{name}-data.js"
    print(f"Writing {filename} ({len(result)} chars)...")
    with open(filename, 'w') as f:
        f.write(f'const {var_name} = "{result}";\n')

    print(f"Done: {filename} ({len(result)} total chars, {num_digits} decimal digits)")
    return result


if __name__ == '__main__':
    generate_constant('e', 'E_DIGITS', lambda: mpmath.e)
    generate_constant('sqrt2', 'SQRT2_DIGITS', lambda: mpmath.sqrt(2))
    print("\nAll data files generated successfully!")
